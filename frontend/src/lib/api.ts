export async function analyzeCase({
  medicalReport,
  insurancePolicy,
}: {
  medicalReport?: File;
  insurancePolicy?: File;
}) {
  const formData = new FormData();

  if (medicalReport) {
    formData.append("medical_report", medicalReport);
  }

  if (insurancePolicy) {
    formData.append("insurance_policy", insurancePolicy);
  }

  const res = await fetch(
    "https://hackia-preauth-ai.onrender.com/analyze",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Error calling backend");
  }

  return await res.json();
}