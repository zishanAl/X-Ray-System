import { XRay } from "../xray-sdk/Recorder";

interface Product {
  asin: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
}

export function runCompetitorSelectionDemo() {
  const referenceProduct: Product = {
    asin: "B0XYZ123",
    title: "ProBrand Steel Bottle 32oz Insulated",
    price: 29.99,
    rating: 4.2,
    reviews: 1247,
  };

  const execution = XRay.startExecution("competitor_selection", {
    referenceProductAsin: referenceProduct.asin,
  });

  /**
   * Step 1: Generate Keywords (Mock LLM)
   */
  const step1 = execution.startStep("generate_keywords");

  step1.recordInput({
    title: referenceProduct.title,
    category: "Sports & Outdoors",
  });

  const keywords = [
    "stainless steel water bottle insulated",
    "vacuum insulated bottle 32oz",
  ];

  step1.recordOutput({ keywords });

  step1.recordReasoning(
    "Extracted material, capacity, and insulation features from product title"
  );

  /**
   * Step 2: Search Candidates (Mock API)
   */
  const step2 = execution.startStep("search_candidates");

  step2.recordInput({ keywords, limit: 5 });

  const candidates: Product[] = [
    {
      asin: "B0COMP01",
      title: "HydroFlask 32oz Wide Mouth",
      price: 44.99,
      rating: 4.5,
      reviews: 8932,
    },
    {
      asin: "B0COMP02",
      title: "Yeti Rambler 26oz",
      price: 34.99,
      rating: 4.4,
      reviews: 5621,
    },
    {
      asin: "B0COMP03",
      title: "Generic Water Bottle",
      price: 8.99,
      rating: 3.2,
      reviews: 45,
    },
    {
      asin: "B0COMP04",
      title: "Bottle Cleaning Brush Set",
      price: 12.99,
      rating: 4.6,
      reviews: 3421,
    },
  ];

  step2.recordOutput({
    totalFetched: candidates.length,
    candidates,
  });

  step2.recordReasoning(
    "Fetched top candidate products based on keyword relevance"
  );

  /**
   * Step 3: Apply Filters & Select Best Match
   */
  const step3 = execution.startStep("apply_filters");

  step3.recordInput({
    referenceProduct,
    candidatesCount: candidates.length,
  });

  const evaluations = candidates.map((product) => {
    const reasons: string[] = [];

    if (product.price < referenceProduct.price * 0.5) {
      reasons.push(
        `Price $${product.price} is below minimum $${(
          referenceProduct.price * 0.5
        ).toFixed(2)}`
      );
    }

    if (product.rating < 3.8) {
      reasons.push(`Rating ${product.rating} < 3.8 threshold`);
    }

    if (product.reviews < 100) {
      reasons.push(`Reviews ${product.reviews} < 100 minimum`);
    }

    return {
      subjectId: product.asin,
      subjectLabel: product.title,
      passed: reasons.length === 0,
      reasons,
      metrics: {
        price: product.price,
        rating: product.rating,
        reviews: product.reviews,
      },
    };
  });

  const qualified = evaluations.filter((e) => e.passed);

  step3.recordEvaluations(evaluations);

  const selected = qualified.sort(
    (a, b) => (b.metrics?.reviews || 0) - (a.metrics?.reviews || 0)
  )[0];

  step3.recordOutput({
    passed: qualified.length,
    failed: evaluations.length - qualified.length,
    selectedCompetitor: selected?.subjectId,
  });

  step3.recordReasoning(
    "Applied price, rating, and review filters and selected candidate with highest review count"
  );

  execution.end();

  return execution.getId();
}