import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// SHA256 hashing helper for Meta Conversions API
export function sha256(data) {
  if (!data) return "";
  const cleaned = String(data).trim().toLowerCase();
  return crypto.createHash("sha256").update(cleaned).digest("hex");
}

// Normalize phone number for Algeria (prefix country code +213 if missing)
export function normalizePhone(phone) {
  if (!phone) return "";
  // Keep only digits
  let cleaned = String(phone).replace(/\D/g, "");
  // Algeria phone normalization
  if (cleaned.startsWith("0") && cleaned.length === 10) {
    cleaned = "213" + cleaned.substring(1);
  } else if (cleaned.length === 9 && !cleaned.startsWith("213")) {
    cleaned = "213" + cleaned;
  }
  return cleaned;
}

/**
 * Sends a Purchase event to Facebook Conversions API
 * @param {object} req - Express request object to retrieve IP and User Agent
 * @param {object} order - Mongoose Order object containing order details
 */
export async function sendFacebookPurchaseEvent(req, order) {
  const pixelId = process.env.FACEBOOK_PIXEL_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn("Facebook Pixel ID or Access Token is missing from environment variables. Skipping Conversions API event.");
    return;
  }

  try {
    const { shippingAddress, totalPrice, orderItems, _id } = order;
    
    // Retrieve client IP and User Agent
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const userAgent = req.headers["user-agent"] || "";

    // Extract cookies for fbp and fbc
    const fbp = req.cookies?.["_fbp"] || "";
    const fbc = req.cookies?.["_fbc"] || "";

    // Normalize and hash phone
    const rawPhone = shippingAddress?.phone || "";
    const normalizedPhone = normalizePhone(rawPhone);
    const hashedPhone = sha256(normalizedPhone);

    // Normalize and split name
    const fullName = shippingAddress?.name || "";
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || firstName;

    const hashedFirstName = sha256(firstName);
    const hashedLastName = sha256(lastName);
    
    // Normalize and hash address details
    const city = shippingAddress?.city || "";
    const hashedCity = sha256(city);
    
    const state = shippingAddress?.wilaya || "";
    const hashedState = sha256(state);

    const hashedCountry = sha256("dz"); // Default to Algeria

    const contents = orderItems.map((item) => ({
      id: String(item.product || item._id),
      quantity: Number(item.qty),
      item_price: Number(item.price)
    }));

    const eventData = {
      event_name: "Purchase",
      event_time: Math.floor(Date.now() / 1000),
      event_id: String(_id),
      event_source_url: req.headers.referer || "",
      action_source: "website",
      user_data: {
        client_ip_address: ipAddress,
        client_user_agent: userAgent,
        ...(fbp ? { fbp } : {}),
        ...(fbc ? { fbc } : {}),
        ...(hashedPhone ? { ph: [hashedPhone] } : {}),
        ...(hashedFirstName ? { fn: [hashedFirstName] } : {}),
        ...(hashedLastName ? { ln: [hashedLastName] } : {}),
        ...(hashedCity ? { ct: [hashedCity] } : {}),
        ...(hashedState ? { st: [hashedState] } : {}),
        country: [hashedCountry]
      },
      custom_data: {
        currency: "DZD",
        value: Number(totalPrice),
        content_type: "product",
        contents: contents
      }
    };

    console.log("Sending Conversions API Event to Facebook:", JSON.stringify(eventData, null, 2));

    const testEventCode = process.env.FACEBOOK_TEST_EVENT_CODE || req.headers["x-test-event-code"] || req.query?.test_event_code;
    const payload = { data: [eventData] };
    if (testEventCode) {
      payload.test_event_code = testEventCode;
      console.log(`Using test_event_code: ${testEventCode}`);
    }

    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${pixelId}/events`,
      payload,
      {
        params: { access_token: accessToken },
        headers: { "Content-Type": "application/json" }
      }
    );

    console.log("Facebook Conversions API Response:", response.data);
  } catch (error) {
    console.error(
      "Error sending Facebook Conversions API event:",
      error.response ? error.response.data : error.message
    );
  }
}
