"use client";

import { useState } from "react";
import { copy, intents, type Intent } from "@/lib/copy";
import { isIntent, type InquirePayload } from "@/lib/inquire";

export function InquireForm({ initialIntent }: { initialIntent?: string }) {
  const [intent, setIntent] = useState<Intent | "">(
    isIntent(initialIntent) ? initialIntent : "",
  );
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [sizeOrStage, setSizeOrStage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "missing">(
    "idle",
  );

  function selectIntent(next: Intent) {
    setIntent(next);
    if (next !== "other") {
      setNote("");
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!intent || !company.trim() || !name.trim() || !email.trim() || !phone.trim()) {
      setStatus("missing");
      return;
    }

    const payload: InquirePayload = {
      intent,
      company: company.trim(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      note: intent === "other" ? note.trim() : "",
      sizeOrStage: sizeOrStage.trim(),
    };

    setStatus("sending");

    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <>
        <h1 id="inquire-title" className="display inquire-h">
          {copy.inquire.success}
        </h1>
        <p className="inquire-lede mute">{copy.inquire.successLede}</p>
      </>
    );
  }

  return (
    <>
      <h1 id="inquire-title" className="display inquire-h">
        {copy.inquire.title}
      </h1>
      <p className="inquire-lede mute">{copy.inquire.lede}</p>
      <form className="inquire-form" onSubmit={onSubmit} noValidate>
        <fieldset>
          <legend className="inquire-legend">{copy.inquire.intent}</legend>
          <div className="inquire-intents">
            {intents.map((value) => {
              const label =
                value === "fund"
                  ? copy.inquire.intentFund
                  : value === "acquire"
                    ? copy.inquire.intentAcquire
                    : copy.inquire.intentOther;
              const selected = intent === value;
              return (
                <label key={value} className={selected ? "inquire-choice is-on" : "inquire-choice"}>
                  <input
                    type="radio"
                    name="intent"
                    value={value}
                    checked={selected}
                    onChange={() => selectIntent(value)}
                    className="sr"
                    required
                  />
                  {label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <label className="inquire-field">
          <span>{copy.inquire.company}</span>
          <input
            type="text"
            name="company"
            autoComplete="organization"
            autoCapitalize="words"
            autoCorrect="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            required
          />
        </label>

        <label className="inquire-field">
          <span>{copy.inquire.name}</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            autoCapitalize="words"
            autoCorrect="off"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label className="inquire-field">
          <span>{copy.inquire.email}</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="inquire-field">
          <span>{copy.inquire.phone}</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </label>

        {intent === "other" && (
          <label className="inquire-field">
            <span>
              {copy.inquire.note} <span className="inquire-opt">{copy.inquire.sizeHint}</span>
            </span>
            <textarea
              name="note"
              rows={4}
              autoComplete="off"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </label>
        )}

        <label className="inquire-field">
          <span>
            {copy.inquire.size} <span className="inquire-opt">{copy.inquire.sizeHint}</span>
          </span>
          <input
            type="text"
            name="sizeOrStage"
            autoComplete="off"
            value={sizeOrStage}
            onChange={(event) => setSizeOrStage(event.target.value)}
          />
        </label>

        {(status === "missing" || status === "error") && (
          <p role="alert" className="inquire-alert">
            {status === "missing" ? copy.inquire.missing : copy.inquire.error}
          </p>
        )}

        <button className="cta" type="submit" disabled={status === "sending"}>
          {status === "sending" ? copy.inquire.sending : copy.inquire.submit}
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </>
  );
}
