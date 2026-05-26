"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [medicalFile, setMedicalFile] = useState<File | null>(null);
  const [medicalText, setMedicalText] = useState("");
  const [policyText, setPolicyText] = useState("");
  const [policyFile, setPolicyFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [caseId, setCaseId] = useState<string>("");

  // LIVE STATES
  const [step, setStep] = useState(0);
  const [typedReasoning, setTypedReasoning] = useState<string[]>([]);

  const steps = [
    "Ingesting medical report",
    "Extracting clinical entities",
    "Matching insurance policy",
    "Evaluating coverage rules",
    "Generating clinical decision"
  ];

  useEffect(() => {
    setCaseId("CASE-" + crypto.randomUUID().slice(0, 6).toUpperCase());
  }, []);

  async function handleAnalyze() {
    setLoading(true);
    setResult(null);
    setTypedReasoning([]);
    setStep(0);

    try {
      const formData = new FormData();

      if (medicalFile) {
        formData.append("medical_report", medicalFile);
      }

      if (policyFile) {
        formData.append("insurance_policy", policyFile);
      }

      formData.append("medical_text", medicalText);
      formData.append("policy_text", policyText);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      // backend puede devolver string o JSON
      const parsed =
        typeof data === "string"
          ? JSON.parse(data)
          : data;

      // simulamos pequeño delay para UX tipo "system processing"
      setTimeout(() => {
        setResult(parsed);

        // animación fake AI reasoning
        parsed.reasoning.forEach((item: string, index: number) => {
          setTimeout(() => {
            setTypedReasoning((prev) => [...prev, item]);
            setStep(index + 1);
          }, index * 800);
        });

        setTimeout(() => {
          setLoading(false);
        }, parsed.reasoning.length * 800 + 500);

      }, 600);

    } catch (error) {
      console.error("Backend error:", error);

      setLoading(false);

      setResult({
        decision: "error",
        confidence: 0,
        reasoning: ["Backend connection failed"]
      });
    }
  }

  const sampleMedicalReport = `
  Patient: Maria Gonzalez
  Age: 47

  Clinical Summary:
  Patient presents symptomatic cholelithiasis with recurrent biliary colic episodes over the last 6 months.

  Ultrasound findings confirm multiple gallstones with gallbladder wall thickening.

  Recommended Procedure:
  Laparoscopic Cholecystectomy

  Attending Physician:
  Dr. Carlos Ramirez
  Hospital Metropolitano Quito
  `;

  const samplePolicy = `
  Insurance Provider: SaludPlus Ecuador
  Plan: Premium Plus Surgical Coverage

  Coverage Includes:
  - General surgery
  - Laparoscopic procedures
  - In-network hospitals

  Waiting Period:
  6 months completed before elective surgery coverage.

  Exclusions:
  - Cosmetic surgery
  - Experimental procedures

  Hospital Network:
  Hospital Metropolitano Quito
  Hospital Vozandes
  `;


  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-8">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Pre-Authorization AI System
          </h1>
          <p className="text-gray-500 text-lg mt-1">
            Live clinical insurance decision engine
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium">System Online</span>
        </div>

      </div>

      {/* FLOW */}
      <div className="max-w-7xl mx-auto mb-6 flex items-center gap-3 text-xs text-gray-400">
        <div className="px-3 py-1 bg-gray-100 rounded-full">Clinical Input</div>
        <div className="h-px w-10 bg-gray-300"></div>
        <div className="px-3 py-1 bg-gray-100 rounded-full">AI Engine</div>
        <div className="h-px w-10 bg-gray-300"></div>
        <div className="px-3 py-1 bg-gray-100 rounded-full">Audit System</div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">

        {/* LEFT */}
        <Card className="col-span-4 p-6 h-[75vh] overflow-y-auto flex flex-col border-white/10 bg-white/70 backdrop-blur-xl">

          <h2 className="text-xl font-semibold mb-2">Clinical Input</h2>


          <div className="space-y-4">

            <div>
              <div className="text-sm font-medium mb-2">
                Medical Report PDF
              </div>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setMedicalFile(e.target.files?.[0] || null)
                }
                className="w-full border rounded-lg p-3 bg-white"
              />

              {/* TEXTAREA MEDICAL */}
              <Textarea
                placeholder="Or paste medical report text..."
                value={medicalText}
                onChange={(e) => setMedicalText(e.target.value)}
                className="mt-3 h-[120px] overflow-y-auto resize-none text-sm leading-relaxed"
              />

              <Button
                type="button"
                variant="outline"
                className="mt-2 w-full"
                onClick={() => setMedicalText(sampleMedicalReport)}
              >
                Load Sample Medical Report
              </Button>

            </div>

            <div>
              <div className="text-sm font-medium mb-2">
                Insurance Policy PDF
              </div>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setPolicyFile(e.target.files?.[0] || null)
                }
                className="w-full border rounded-lg p-3 bg-white"
              />

              {/* TEXTAREA POLICY */}
              <Textarea
                placeholder="Or paste insurance policy text..."
                value={policyText}
                onChange={(e) => setPolicyText(e.target.value)}
                className="mt-3 h-[120px] overflow-y-auto resize-none text-sm leading-relaxed"
              />

              <Button
                type="button"
                variant="outline"
                className="mt-2 w-full"
                onClick={() => setPolicyText(samplePolicy)}
              >
                Load Sample Insurance Policy
              </Button>

            </div>

          </div>


          <Button
            className="w-full mt-4 text-base py-6"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Processing..." : "Run Pre-Authorization"}
          </Button>

          {/* LIVE PIPELINE */}
          {loading && (
            <div className="mt-6 space-y-3 text-sm border-t pt-4">

              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-300 ${
                    i < step
                      ? "text-green-600"
                      : i === step
                      ? "text-black font-semibold animate-pulse"
                      : "text-gray-300"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      i < step
                        ? "bg-green-500"
                        : i === step
                        ? "bg-black"
                        : "bg-gray-300"
                    }`}
                  />
                  <span>{s}</span>
                </div>
              ))}

              <div className="text-xs text-gray-400 font-mono mt-3">
                [SYSTEM] Executing {caseId}
              </div>

            </div>
          )}

        </Card>

        {/* RIGHT */}
        <Card className="col-span-8 p-8 h-[75vh] overflow-y-auto border-white/10 bg-white/70 backdrop-blur-xl">
        
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Decision Output</h2>

            {caseId && (
              <div className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                {caseId}
              </div>
            )}
          </div>

          {/* LOADING STATE */}
          {loading && !result && (
            <div className="space-y-4 mt-4">
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <Progress value={(step / (steps.length - 1)) * 100} className="h-3" />
            </div>
          )}

          {/* EMPTY */}
          {!loading && !result && (
            <div className="text-gray-500 text-lg mt-10">
              Awaiting clinical analysis...
            </div>
          )}

          {/* RESULT (LIVE FEEL) */}
          {result && !loading && (
            <div className="space-y-10 animate-in fade-in duration-500">

              {/* STATUS */}
              <div className="flex items-center gap-4">

                <Badge
                  className={`px-5 py-2 text-sm text-white ${
                    (result.decision || "").toUpperCase() === "APPROVED"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {(result.decision || "UNKNOWN").toUpperCase()}
                </Badge>

                <div className="text-lg text-gray-600">
                  Confidence:
                  <span className="font-semibold text-black ml-2">
                    {result.confidence}%
                  </span>
                </div>

              </div>

              <Progress value={result.confidence} className="h-3" />

              {/* LIVE REASONING */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Live AI Reasoning
                </h3>

                <div className="space-y-4">
                  {typedReasoning.map((r, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-green-600 text-lg">✓</span>
                      <span className="text-gray-700">{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* STRIPE-STYLE TIMELINE */}
              <div className="mt-10">

                <h3 className="text-xl font-semibold mb-5">
                  Audit Trail
                </h3>

                <div className="relative space-y-6">

                  {/* BACK LINE */}
                  <div className="absolute left-[11px] top-0 bottom-0 w-px bg-gray-200" />

                  {/* PROGRESS LINE */}
                  <div
                    className="absolute left-[11px] top-0 w-px bg-green-500 transition-all duration-700"
                    style={{
                      height: `${(step / (steps.length - 1)) * 100}%`
                    }}
                  />

                  {result.reasoning.map((r: string, i: number) => {
                    const isActive = step === i;

                    return (
                      <div
                        key={i}
                        className="grid grid-cols-[24px_1fr] gap-x-4 items-start"
                      >

                        {/* DOT */}
                        <div className="relative flex justify-center">

                          <div
                            className={`h-3.5 w-3.5 rounded-full transition-all duration-300 ${
                              i < step
                                ? "bg-green-500"
                                : isActive
                                ? "bg-black animate-pulse scale-125"
                                : "bg-gray-300"
                            }`}
                          />

                        </div>

                        {/* CONTENT */}
                        <div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider">
                            Step {i + 1}
                          </div>

                          <div className="text-sm text-gray-700">
                            {r}
                          </div>
                        </div>

                      </div>
                    );
                  })}

                </div>
              </div>

            </div>
          )}

        </Card>

      </div>
    </main>
  );
}