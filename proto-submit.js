(() => {
  const cfg = window.PROTOVOX_SUPABASE || {};
  const configured = cfg.url && cfg.anonKey &&
    !cfg.url.includes("YOUR-PROJECT") && !cfg.anonKey.includes("YOUR_SUPABASE");
  let client = null;
  if (configured && window.supabase?.createClient) {
    client = window.supabase.createClient(cfg.url, cfg.anonKey);
  }
  window.protoSaveRequest = async (requestType, payload) => {
    if (!client) return { ok: false, reason: "not_configured" };
    const pick = (...keys) => keys.map(k => payload[k]).find(v => v != null && String(v).trim());
    payload = payload && typeof payload === "object" ? payload : {};
    const senderName = pick("name", "contact", "contactName", "fullName") || "Website visitor";
    const email = pick("email", "replyEmail") || "";
    const phone = pick("phone") || "";
    const organisation = pick("organisation", "institution", "company") || "";
    const subject = pick("ideaName", "topic", "category", "institution", "project") || requestType.replaceAll("_", " ");
    try {
      const { error } = await client.from("proto_requests").insert({
        request_type: String(requestType || "contact").slice(0,60),
        subject: String(subject).slice(0,180),
        sender_name: String(senderName).slice(0,120),
        email: String(email).slice(0,180),
        phone: String(phone).slice(0,60),
        organisation: String(organisation).slice(0,180),
        payload
      });
      if (error) return { ok: false, reason: error.message };
      return { ok: true };
    } catch (error) {
      return { ok: false, reason: error?.message || "network_error" };
    }
  };
})();
