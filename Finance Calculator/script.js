document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");
  const calculatorContent = document.getElementById("calculator-content"); // This will now be the container for all calculators
  const mainTitle = document.getElementById("main-title");

  // Select all potential calculator content divisions
  const allCalculatorContentDivs = document.querySelectorAll(
    ".calculator-page-content"
  );

  function hideAllCalculatorPages() {
    allCalculatorContentDivs.forEach((div) => {
      div.style.display = "none";
    });
    // Also hide the home grid when a calculator is selected
    document.getElementById("home-content-grid").style.display = "none";
  }

  function loadContent(hash) {
    let page = hash.substring(1) || "home";
    hideAllCalculatorPages(); // Hide all calculator pages and home grid first


    

    if (page === "home") {
      mainTitle.textContent = "Welcome to the Finance Calculator!";
      document.getElementById("home-content-grid").style.display = "grid"; // Show the home content grid
    } else {
      mainTitle.textContent =
        page
          .replace(/-/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ") + " Calculator";
      const targetContentDiv = document.getElementById(`${page}-page-content`); // e.g., 'sip-page-content'
      if (targetContentDiv) {
        targetContentDiv.style.display = "block"; // Show the specific calculator content
      } else {
        // Fallback to home if page not found
        document.getElementById("home-content-grid").style.display = "grid";
      }
    }

    // Update active link in sidebar
    sidebarLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${page}`) {
        link.classList.add("active");
      }
    });
    attachCalculatorEventListeners(); // Re-attach listeners when content changes (important for new elements appearing)
  }

  // Function to attach all calculator event listeners
  function attachCalculatorEventListeners() {
    // SIP Calculator
    const sipForm = document.getElementById("sip-form");
    if (sipForm) {
      sipForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const monthlyInvestment = parseFloat(
          document.getElementById("monthly-investment").value
        );
        const annualRate = parseFloat(
          document.getElementById("interest-rate").value
        );
        const inputYears = parseFloat(
          document.getElementById("investment-years").value
        );
        const inputMonths = parseFloat(
          document.getElementById("investment-months").value
        );
        const resultDiv = document.getElementById("sip-result"); // Get the result div here

        if (
          isNaN(monthlyInvestment) ||
          isNaN(annualRate) ||
          isNaN(inputYears) ||
          isNaN(inputMonths) ||
          monthlyInvestment <= 0 ||
          annualRate < 0 ||
          inputYears < 0 ||
          inputMonths < 0
        ) {
          resultDiv.style.display = "block";
          resultDiv.innerHTML =
            '<p style="color: red;">Please enter valid positive numbers for all fields.</p>';
          return;
        }
        if (inputYears === 0 && inputMonths === 0) {
          resultDiv.style.display = "block";
          resultDiv.innerHTML =
            '<p style="color: red;">Investment period cannot be zero.</p>';
          return;
        }

        const years = inputYears + inputMonths / 12;
        const months = Math.round(years * 12);
        const monthlyRate = annualRate / 12 / 100;
        let futureValue = 0;
        if (monthlyRate === 0) {
          futureValue = monthlyInvestment * months;
        } else {
          futureValue =
            monthlyInvestment *
            (((1 + monthlyRate) ** months - 1) / monthlyRate) *
            (1 + monthlyRate);
        }
        const investedAmount = monthlyInvestment * months;
        const estimatedReturns = futureValue - investedAmount;
        resultDiv.style.display = "block";
        resultDiv.innerHTML = `
                <p>Invested Amount: ₹${investedAmount.toLocaleString(
                  "en-IN"
                )}</p>
                <p>Estimated Returns: ₹${estimatedReturns.toLocaleString(
                  "en-IN"
                )}</p>
                <p>Total Value: ₹${futureValue.toLocaleString("en-IN")}</p>
              `;
      });
    }

    // Mutual Fund Calculator
    const mutualFundForm = document.getElementById("mutual-fund-form");
    if (mutualFundForm) {
      mutualFundForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const initialInvestment = parseFloat(
          document.getElementById("initial-investment").value
        );
        const monthlyInvestment = parseFloat(
          document.getElementById("mf-monthly-investment").value
        );
        const annualRate = parseFloat(
          document.getElementById("mf-interest-rate").value
        );
        const inputYears = parseFloat(
          document.getElementById("mf-investment-years").value
        );
        const inputMonths = parseFloat(
          document.getElementById("mf-investment-months").value
        );
        const resultDiv = document.getElementById("mutual-fund-result"); // Get the result div here

        if (
          isNaN(initialInvestment) ||
          isNaN(monthlyInvestment) ||
          isNaN(annualRate) ||
          isNaN(inputYears) ||
          isNaN(inputMonths) ||
          initialInvestment < 0 ||
          monthlyInvestment < 0 ||
          annualRate < 0 ||
          inputYears < 0 ||
          inputMonths < 0
        ) {
          resultDiv.style.display = "block";
          resultDiv.innerHTML =
            '<p style="color: red;">Please enter valid positive numbers for all fields.</p>';
          return;
        }
        if (inputYears === 0 && inputMonths === 0) {
          resultDiv.style.display = "block";
          resultDiv.innerHTML =
            '<p style="color: red;">Investment period cannot be zero.</p>';
          return;
        }

        const years = inputYears + inputMonths / 12;
        const monthlyRate = annualRate / 12 / 100;
        const months = years * 12;

        const futureValueLumpsum =
          initialInvestment * (1 + monthlyRate) ** months;
        const futureValueSip =
          monthlyInvestment *
          (((1 + monthlyRate) ** months - 1) / monthlyRate) *
          (1 + monthlyRate);
        const totalValue = futureValueLumpsum + futureValueSip;
        const totalInvestment = initialInvestment + monthlyInvestment * months;
        const estimatedReturns = totalValue - totalInvestment;

        resultDiv.style.display = "block";
        resultDiv.innerHTML = `<p>Invested Amount: ₹${totalInvestment.toLocaleString(
          "en-IN"
        )}</p>
                    <p>Estimated Returns: ₹${estimatedReturns.toLocaleString(
                      "en-IN"
                    )}</p>
                    <p>Total Value: ₹${totalValue.toLocaleString("en-IN")}</p>`;
      });
    }

    // Capital Gain Tax Calculator (no time input, no change needed)
    const capitalGainForm = document.getElementById("capital-gain-form");
    if (capitalGainForm) {
      capitalGainForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const purchasePrice = parseFloat(
          document.getElementById("cg-purchase-price").value
        );
        const sellPrice = parseFloat(
          document.getElementById("cg-sell-price").value
        );
        const investmentType = document.getElementById("investment-type").value;
        const resultDiv = document.getElementById("capital-gain-result");

        if (
          isNaN(purchasePrice) ||
          isNaN(sellPrice) ||
          purchasePrice <= 0 ||
          sellPrice <= 0
        ) {
          resultDiv.style.display = "block";
          resultDiv.innerHTML =
            '<p style="color: red;">Please enter valid positive numbers for Purchase Price and Sell Price.</p>';
          return;
        }

        const capitalGain = sellPrice - purchasePrice;
        const taxExemption = 100000; // Define taxExemption at a higher scope
        let tax = 0;
        let taxableGainDisplay = capitalGain; // Default for display

        if (capitalGain > 0) {
          if (investmentType === "short-term") {
            tax = capitalGain * 0.15;
          } else {
            if (capitalGain > taxExemption) {
              taxableGainDisplay = capitalGain - taxExemption; // Update for display
              tax = taxableGainDisplay * 0.1;
            } else {
              taxableGainDisplay = 0; // If capital gain is less than exemption, taxable gain is 0
              tax = 0;
            }
          }
        }

        resultDiv.style.display = "block";
        resultDiv.innerHTML = `<p>Capital Gain: ₹${capitalGain.toLocaleString(
          "en-IN"
        )}</p>
                    <p>Taxable Gain: ₹${taxableGainDisplay.toLocaleString(
                      "en-IN"
                    )}</p>
                    <p>Tax Payable: ₹${tax.toLocaleString("en-IN")}</p>`;
      });
    }

    // EMI Calculator
    const emiForm = document.getElementById("emi-form");
    if (emiForm) {
      emiForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const loanAmount = parseFloat(
          document.getElementById("loan-amount").value
        );
        const annualRate = parseFloat(
          document.getElementById("emi-interest-rate").value
        );
        const inputYears = parseFloat(
          document.getElementById("loan-tenure-years").value
        );
        const inputMonths = parseFloat(
          document.getElementById("loan-tenure-months").value
        );
        const resultDiv = document.getElementById("emi-result");

        let errorMsg = "";
        if (isNaN(loanAmount) || loanAmount <= 0) {
          errorMsg += "Please enter a valid, positive loan amount.<br>";
        }
        if (
          annualRate === "" ||
          isNaN(annualRate) ||
          annualRate < 0 ||
          annualRate > 100
        ) {
          errorMsg +=
            "Please enter a valid interest rate between 0 and 100.<br>";
        }
        if (isNaN(inputYears) || inputYears < 0) {
          errorMsg += "Please enter a valid, non-negative number of years.<br>";
        }
        if (isNaN(inputMonths) || inputMonths < 0) {
          errorMsg +=
            "Please enter a valid, non-negative number of months.<br>";
        }
        if (errorMsg) {
          resultDiv.style.display = "block";
          resultDiv.innerHTML = `<p style="color: red;">${errorMsg}</p>`;
          return;
        }
        if (inputYears === 0 && inputMonths === 0) {
          resultDiv.style.display = "block";
          resultDiv.innerHTML =
            '<p style="color: red;">Loan tenure cannot be zero.</p>';
          return;
        }

        const years = inputYears + inputMonths / 12;
        const monthlyRate = annualRate / 12 / 100;
        const months = years * 12;

        if (monthlyRate === 0) {
          const emi = loanAmount / months;
          const totalAmount = loanAmount;
          const totalInterest = 0;
          resultDiv.style.display = "block";
          resultDiv.innerHTML = `<p>Loan EMI: ₹${emi.toLocaleString(
            "en-IN"
          )}</p>
                        <p>Total Interest Payable: ₹${totalInterest.toLocaleString(
                          "en-IN"
                        )}</p>
                        <p>Total Payment (Principal + Interest): ₹${totalAmount.toLocaleString(
                          "en-IN"
                        )}</p>`;
        } else {
          const emi =
            (loanAmount * monthlyRate * (1 + monthlyRate) ** months) /
            ((1 + monthlyRate) ** months - 1);
          const totalAmount = emi * months;
          const totalInterest = totalAmount - loanAmount;

          resultDiv.style.display = "block";
          resultDiv.innerHTML = `<p>Loan EMI: ₹${emi.toLocaleString(
            "en-IN"
          )}</p>
                        <p>Total Interest Payable: ₹${totalInterest.toLocaleString(
                          "en-IN"
                        )}</p>
                        <p>Total Payment (Principal + Interest): ₹${totalAmount.toLocaleString(
                          "en-IN"
                        )}</p>`;
        }
      });
    }

    // FD Calculator
    const fdForm = document.getElementById("fd-form");
    if (fdForm) {
      fdForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const principal = parseFloat(
          document.getElementById("principal-amount").value
        );
        const annualRate = parseFloat(
          document.getElementById("fd-interest-rate").value
        );
        const inputYears = parseFloat(
          document.getElementById("fd-investment-years").value
        );
        const inputMonths = parseFloat(
          document.getElementById("fd-investment-months").value
        );
        const resultDiv = document.getElementById("fd-result");

        if (
          isNaN(principal) ||
          isNaN(annualRate) ||
          isNaN(inputYears) ||
          isNaN(inputMonths) ||
          principal <= 0 ||
          annualRate < 0 ||
          inputYears < 0 ||
          inputMonths < 0
        ) {
          resultDiv.style.display = "block";
          resultDiv.innerHTML =
            '<p style="color: red;">Please enter valid positive numbers for all FD fields.</p>';
          return;
        }
        if (inputYears === 0 && inputMonths === 0) {
          resultDiv.style.display = "block";
          resultDiv.innerHTML =
            '<p style="color: red;">Investment period cannot be zero.</p>';
          return;
        }

        const years = inputYears + inputMonths / 12;
        const maturityValue = principal * (1 + annualRate / 100) ** years;
        const interestEarned = maturityValue - principal;

        resultDiv.style.display = "block";
        resultDiv.innerHTML = `<p>Principal Amount: ₹${principal.toLocaleString(
          "en-IN"
        )}</p>
                    <p>Interest Earned: ₹${interestEarned.toLocaleString(
                      "en-IN"
                    )}</p>
                    <p>Maturity Value: ₹${maturityValue.toLocaleString(
                      "en-IN"
                    )}</p>`;
      });
    }

    // Real Estate Return Calculator
    const realEstateForm = document.getElementById("real-estate-form");
    if (realEstateForm) {
      realEstateForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const purchasePrice = parseFloat(
          document.getElementById("re-purchase-price").value
        );
        const sellPrice = parseFloat(
          document.getElementById("re-sell-price").value
        );
        const inputYears = parseFloat(
          document.getElementById("re-holding-years").value
        );
        const inputMonths = parseFloat(
          document.getElementById("re-holding-months").value
        );
        const resultDiv = document.getElementById("real-estate-result");

        if (
          isNaN(purchasePrice) ||
          isNaN(sellPrice) ||
          isNaN(inputYears) ||
          isNaN(inputMonths) ||
          purchasePrice <= 0 ||
          sellPrice <= 0 ||
          inputYears < 0 ||
          inputMonths < 0
        ) {
          resultDiv.style.display = "block";
          resultDiv.innerHTML =
            '<p style="color: red;">Please enter valid positive numbers for all Real Estate fields.</p>';
          return;
        }
        if (inputYears === 0 && inputMonths === 0) {
          resultDiv.style.display = "block";
          resultDiv.innerHTML =
            '<p style="color: red;">Holding period cannot be zero.</p>';
          return;
        }

        const holdingPeriod = inputYears + inputMonths / 12;
        const absoluteReturn =
          ((sellPrice - purchasePrice) / purchasePrice) * 100;
        const annualizedReturn =
          (Math.pow(sellPrice / purchasePrice, 1 / holdingPeriod) - 1) * 100;

        resultDiv.style.display = "block";
        resultDiv.innerHTML = `<p>Absolute Return: ${absoluteReturn.toFixed(
          2
        )}%</p>
                    <p>Annualized Return: ${annualizedReturn.toFixed(2)}%</p>`;
      });
    }
  }

  // Initial load based on URL hash or default to home
  loadContent(window.location.hash);

  // Handle navigation clicks
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const hash = link.getAttribute("href");
      window.location.hash = hash; // Update hash for browser history
      loadContent(hash); // Call loadContent directly
    });
  });

  // Handle browser back/forward buttons
  window.addEventListener("hashchange", () => {
    loadContent(window.location.hash);
  });
});
