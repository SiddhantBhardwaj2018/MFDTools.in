import { API_URL } from "../../../../config/url";

const calculateDeferredSWPPlanning = async (req, res) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Replace with your allowed origins
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).end();
    return;
  }

  // checking if is a post request
  if (req.method === "POST") {
    let {
      token,
      currentAge,
      retirementAge,
      currentSIPInvestment,
      currentLumpsumInvestment,
      investmentPortfolioRate,
      swpRate,
    } = req.body;

    // Making a post request to hit our backend api-endpoint
    const apiRes = await fetch(
      `${API_URL}/api/mfTools/calculatePreRetirementSWPReturn`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentAge,
          retirementAge,
          currentSIPInvestment,
          currentLumpsumInvestment,
          investmentPortfolioRate,
          swpRate,
        }),
      }
    );

    const data = await apiRes.json();

    if (apiRes.ok) {
      res.status(200).json(data);
    } else {
      res.status(data.status).json({ message: data.error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default calculateDeferredSWPPlanning;
