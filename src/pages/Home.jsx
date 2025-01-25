
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const loanOptions = {
    "Wedding Loan": ["Valima", "Furniture", "Valima Food", "Jahez"],
    "Home Construction Loan": ["Structure", "Finishing"],
    "Business Startup Loan": ["Buy Stall" , "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
    "Education Loan": ["University Fees", "Child Fees Loan"],
  };
  const navigate = useNavigate()

  const [loanName, setLoanName] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [maxLoan, setMaxLoan] = useState("");
  const [loanPeriod, setloanPeriod] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post("https://gross-vina-final-hackathon-smit-633a1bb1.koyeb.app/api/loan/applyLoan", {
        loanName,
        subcategories,
        maxLoan,
        loanPeriod,
      });
      console.log(response);
      alert("Loan application submitted successfully!");
      navigate("/Register")

    } catch (error) {
      console.error("Error applying for loan:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Apply for a Loan</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Loan Type Dropdown */}
        <div>
          <label className="block mb-2 font-medium">Loan Type</label>
          <select
            value={loanName}
            onChange={(e) => {
              setLoanName(e.target.value);
              setSubcategories('');
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select Loan Type</option>
            {Object.keys(loanOptions).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Dropdown */}
        {loanName && (
          <div>
            <label className="block mb-2 font-medium">Subcategory</label>
            <select
              value={subcategories}
              onChange={(e) => setSubcategories(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select Subcategory</option>
              {loanOptions[loanName].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Amount Input */}
        <div>
          <label className="block mb-2 font-medium">Amount (PKR)</label>
          <input
            type="number"
            value={maxLoan}
            onChange={(e) => setMaxLoan(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter loan amount"
            required
          />
        </div>

        {/* Duration Input */}
        <div>
          <label className="block mb-2 font-medium">Duration (Years)</label>
          <input
            type="number"
            value={loanPeriod}
            onChange={(e) => setloanPeriod(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter duration in years"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          Submit Loan Application
        </button>
      </form>
    </div>
  );
};

export default Home;

