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
      <h1 className="font-serif text-4xl leading-tight tracking-tight text-paper sm:text-5xl">
        {copy.inquire.success}
      </h1>
    );
  }

  const fieldClass =
    "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-base text-paper outline-none transition-colors placeholder:text-mute/50 focus:border-paper";

  return (
    <>
      <h1 className="font-serif text-4xl tracking-tight text-paper sm:text-5xl">
        {copy.inquire.title}
      </h1>
      <p className="mt-6 mb-14 text-base leading-relaxed text-mute">{copy.inquire.lede}</p>
      <form onSubmit={onSubmit} className="space-y-10" noValidate>
        <fieldset>
          <legend className="mb-4 text-sm text-mute">{copy.inquire.intent}</legend>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {intents.map((value) => {
              const label =
                value === "fund"
                  ? copy.inquire.intentFund
                  : value === "acquire"
                    ? copy.inquire.intentAcquire
                    : copy.inquire.intentOther;
              const selected = intent === value;
              return (
                <label key={value} className="cursor-pointer text-base">
                  <input
                    type="radio"
                    name="intent"
                    value={value}
                    checked={selected}
                    onChange={() => selectIntent(value)}
                    className="sr-only"
                    required
                  />
                  <span
                    className={
                      selected
                        ? "text-paper underline decoration-paper/50 underline-offset-8"
                        : "text-mute transition-colors hover:text-paper"
                    }
                  >
                    {label}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <label className="block">
          <span className="text-sm text-mute">{copy.inquire.company}</span>
          <input
            type="text"
            name="company"
            autoComplete="organization"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className={fieldClass}
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-mute">{copy.inquire.name}</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClass}
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-mute">{copy.inquire.email}</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass}
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-mute">{copy.inquire.phone}</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={fieldClass}
            required
          />
        </label>

        {intent === "other" && (
          <label className="block">
            <span className="text-sm text-mute">
              {copy.inquire.note}{" "}
              <span className="text-mute/70">{copy.inquire.sizeHint}</span>
            </span>
            <textarea
              name="note"
              rows={4}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className={`${fieldClass} resize-none`}
            />
          </label>
        )}

        <label className="block">
          <span className="text-sm text-mute">
            {copy.inquire.size}{" "}
            <span className="text-mute/70">{copy.inquire.sizeHint}</span>
          </span>
          <input
            type="text"
            name="sizeOrStage"
            value={sizeOrStage}
            onChange={(event) => setSizeOrStage(event.target.value)}
            className={fieldClass}
          />
        </label>

        {(status === "missing" || status === "error") && (
          <p role="alert" className="text-sm text-paper">
            {status === "missing" ? copy.inquire.missing : copy.inquire.error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="text-base text-paper underline decoration-paper/40 underline-offset-8 transition-opacity hover:decoration-paper disabled:cursor-wait disabled:opacity-50"
        >
          {status === "sending" ? copy.inquire.sending : copy.inquire.submit}
        </button>
      </form>
    </>
  );
}
