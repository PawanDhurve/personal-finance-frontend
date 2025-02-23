import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faWallet, faLineChart, faUniversity, faStar } from '@fortawesome/free-solid-svg-icons';
import "./HomePage.css";

// Register the chart elements required for chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HomePage = () => {
  const [showAds, setShowAds] = useState(false);
  const [newReview, setNewReview] = useState(""); // State for input review
  const [reviews, setReviews] = useState([]); // State for user reviews
  const [rating, setRating] = useState(null); // State for the user's rating, initialized to null

  // Function to handle review submission

  const [selectedStars, setSelectedStars] = useState([]); // Array to store selected stars

  const [dropdownVisible, setDropdownVisible] = useState(null); // Track which dropdown is visible
  const [editingReviewIndex, setEditingReviewIndex] = useState(null); // To handle the review being edited
  
  // Toggle dropdown visibility when clicking on three dots
  const toggleDropdown = (index) => {
    setDropdownVisible(dropdownVisible === index ? null : index); // Toggle visibility based on current state
  };
  
  // Handle the edit review action
  const handleEditReview = (index) => {
    const reviewToEdit = reviews[index];
    setNewReview(reviewToEdit.review);
    setRating(reviewToEdit.rating);
    setEditingReviewIndex(index);
    setDropdownVisible(null); // Close dropdown after selecting edit
  };
  
  // Handle the delete review action
  const handleDeleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    setDropdownVisible(null); // Close dropdown after deleting review
  };
  
  // Handle rating star click
  const handleRatingClick = (star) => {
    setRating(star);
  };
  
  // Handle form submission
  const handleAddReview = (e) => {
    e.preventDefault();
    if (editingReviewIndex !== null) {
      // Edit existing review
      const updatedReviews = reviews.map((review, index) =>
        index === editingReviewIndex
          ? { ...review, review: newReview, rating }
          : review
      );
      setReviews(updatedReviews);
      setEditingReviewIndex(null); // Reset after edit
    } else {
      // Add new review
      setReviews([...reviews, { profile: 'User', review: newReview, rating }]);
    }
    setNewReview('');
    setRating(0);
  };
  
   const [openFAQ, setOpenFAQ] = useState(null); // Track which FAQ is open

  const toggleAnswer = (index) => {
    setOpenFAQ(openFAQ === index ? null : index); // Toggle open/close state
  };

  const faqData = [
    { question: "What is the Personal Finance Manager?", answer: "The Personal Finance Manager helps users track, manage, and optimize their expenses." },
    { question: "How do I create an expense?", answer: "Go to the 'Expenses' section, click 'Add Expense,' and fill in the necessary details." },
    { question: "Can I edit or delete an expense?", answer: "Yes, you can modify or remove expenses anytime from the expense list." },
    { question: "How does the real-time update feature work?", answer: "Any changes you make are instantly reflected across all reports." },
    { question: "Is my data secure?", answer: "Yes, we use encryption and security protocols to protect your data." },
    { question: "How do I reset my password?", answer: "Click 'Forgot Password' on the login page and follow the instructions." },
    { question: "Can I use this app on mobile?", answer: "Yes, our platform is mobile-friendly and accessible from any device." },
    { question: "Is there a limit on expenses I can add?", answer: "No, you can track unlimited expenses for effective management." },
    { question: "Is Personal Finance Manager free?", answer: "Basic features are free, but premium features require a subscription." },
    { question: "How can I contact support?", answer: "Use the 'Contact Us' section or email support@financeapp.com." }
  ];

  // Sample data for the chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Expenses Over Time",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  useEffect(() => {
    // Show ads after 5 seconds
    const timer = setTimeout(() => {
      setShowAds(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section id="hero" className="hero">
        <h1>Welcome to Personal Finance Manager</h1>
        <p>Manage your expenses, track budgets, and achieve financial goals!</p>
        <button className="btn">Get Started</button>
      </section>

      {/* Finance Options Section */}
      <section id="finance-options" className="finance-options">
        <h2>Explore Our Finance Solutions</h2>
        <div className="options-container">
          <div className="option expense-management">
            <FontAwesomeIcon icon={faChartPie} size="3x" />
            <span className="option-text">Expense Management</span>
          </div>
          <div className="option budget-planning">
            <FontAwesomeIcon icon={faWallet} size="3x" />
            <span className="option-text">Budget Planning</span>
          </div>
          <div className="option investment-strategies">
            <FontAwesomeIcon icon={faLineChart} size="3x" />
            <span className="option-text">Investment Strategies</span>
          </div>
          <div className="option financial-freedom">
            <FontAwesomeIcon icon={faUniversity} size="3x" />
            <span className="option-text">Financial Freedom</span>
          </div>
        </div>
      </section>

      {/* Expense Tracking and Ads Section */}
      <section className="chart-and-ads-section">
        <div className="chart-container-wrapper">
          <h2>Expense Tracking</h2>
          <div className="expense-tracking-chart">
            <Line data={data} options={options} />
          </div>
        </div>
        <div className="ads-container">
          <div className="ad-image-placeholder">
            {showAds && <p>Add your image link here</p>}
          </div>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section id="sponsorship" className="sponsorship">
        <h2>Sponsorship</h2>
        <div className="sponsorship-container">
          <div className="ad-slide-up">📉 Investment Opportunities</div>
          <div className="ad-slide-up">🏦 Best Bank Deals</div>
          <div className="ad-slide-up">💳 Credit Card Offers</div>
        </div>
      </section>

      {/* Key Features and Articles Section */}
      <section className="articles-features-container">
        <section id="features" className="features">
          <h2>Key Features</h2>
          <div className="feature-container">
            <div className="feature">
              <FontAwesomeIcon icon={faChartPie} size="2x" />
              <span>📊 Expense Tracking</span>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faWallet} size="2x" />
              <span>💰 Budget Planning</span>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faLineChart} size="2x" />
              <span>📈 Reports & Insights</span>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faUniversity} size="2x" />
              <span>🤖 AI-Powered Expense Insights</span>
            </div>
          </div>
        </section>

        {/* Finance Articles Section */}
        <section id="articles" className="articles">
          <h2>Finance Tips & Articles</h2>
          <div className="article-container">
            <div className="article">
              <h3>💰 How to Save More Money</h3>
              <p>Learn the best saving strategies...</p>
              <button>Read More</button>
            </div>
            <div className="article">
              <h3>📉 Smart Investment Tips</h3>
              <p>Understanding stock markets...</p>
              <button>Read More</button>
            </div>
          </div>
        </section>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <h2>User Testimonials</h2>
        <p>See what our users have to say!</p>

        <div className="testimonials-content">
          {/* Recent Reviews Box */}
          <div className="recent-reviews-box">
            <h3>Recent Reviews</h3>
            <div className="reviews-container">
              {reviews.length > 0 ? (
                reviews.map((reviewData, index) => (
                  <div key={index} className="review-card">
                    <div className="review-header">
                      <p><strong>{reviewData.profile}</strong> says:</p>

                      {/* Three-dot Dropdown Button */}
                      <div className="dropdown">
                        <button className="dropbtn" onClick={() => toggleDropdown(index)}>
                          ...
                        </button>
                        <div className="dropdown-content" style={{ display: dropdownVisible === index ? 'block' : 'none' }}>
                          <button onClick={() => handleEditReview(index)}>Edit</button>
                          <button onClick={() => handleDeleteReview(index)}>Delete</button>
                        </div>
                      </div>

                    </div>
                    <p>{reviewData.review}</p>
                    <div className="review-rating">
                      {Array.from({ length: 5 }, (_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={faStar}
                          color={index < reviewData.rating ? "#FFD700" : "#ccc"}
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews yet. Be the first to share your experience!</p>
              )}
            </div>
          </div>

          {/* Add Review Box */}
          <div className="add-review-box">
            <h3>Add a Review</h3>
            <form onSubmit={handleAddReview} className="review-form">
              <textarea
                placeholder="Write your review..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                required
              />
              <div className="rating">
                {[5, 4, 3, 2, 1].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    color={rating >= star ? "#FFD700" : "#ccc"}
                    onClick={() => handleRatingClick(star)}
                    className={`star ${rating >= star ? 'selected' : ''}`}
                  />
                ))}
              </div>
              <button type="submit" className="btn">Submit Review</button>
            </form>
          </div>
        </div>
      </section>

{/* FAQ Section */}
<section id="faq" className="faq">
  <h2>FAQs</h2>
  <p>Commonly asked questions about our app.</p>

  <div className="faq-list">
    <div className="faq-item">
      <button className="faq-question" onClick={() => toggleAnswer(0)}>
        What is the Personal Finance Manager?
      </button>
      <div className="faq-answer" id="answer-0">
        <p>The Personal Finance Manager is a platform designed to help users track, manage, and optimize their expenses. Users can easily create, view, edit, and delete expenses, with real-time updates across all reports.</p>
      </div>
    </div>
    
    <div className="faq-item">
      <button className="faq-question" onClick={() => toggleAnswer(1)}>
        How do I create an expense?
      </button>
      <div className="faq-answer" id="answer-1">
        <p>To create an expense, simply log in to your account, go to the "Expenses" section, and click on "Add Expense." Fill in the necessary details like the expense name, amount, date, and category, then save it.</p>
      </div>
    </div>

    <div className="faq-item">
      <button className="faq-question" onClick={() => toggleAnswer(2)}>
        Can I edit or delete an expense after it’s been created?
      </button>
      <div className="faq-answer" id="answer-2">
        <p>Yes, you can easily edit or delete an expense at any time. Just select the expense from your list, make the necessary changes or click on "Delete" to remove it.</p>
      </div>
    </div>

    <div className="faq-item">
      <button className="faq-question" onClick={() => toggleAnswer(3)}>
        How does the real-time update feature work?
      </button>
      <div className="faq-answer" id="answer-3">
        <p>The real-time update feature ensures that any changes you make to your expenses (adding, editing, or deleting) are instantly reflected across all reports. This way, you always have up-to-date information.</p>
      </div>
    </div>

    <div className="faq-item">
      <button className="faq-question" onClick={() => toggleAnswer(4)}>
        Is my data secure on the platform?
      </button>
      <div className="faq-answer" id="answer-4">
        <p>Yes, your data is securely stored and protected using the latest encryption technologies. We prioritize user privacy and security, ensuring that your financial information remains safe.</p>
      </div>
    </div>

    <div className="faq-item">
      <button className="faq-question" onClick={() => toggleAnswer(5)}>
        How do I reset my password?
      </button>
      <div className="faq-answer" id="answer-5">
        <p>If you forget your password, go to the login page and click on "Forgot Password." Enter your registered email address, and you'll receive a link to reset your password.</p>
      </div>
    </div>

    <div className="faq-item">
      <button className="faq-question" onClick={() => toggleAnswer(6)}>
        Can I view my expenses on a mobile device?
      </button>
      <div className="faq-answer" id="answer-6">
        <p>Yes! The Personal Finance Manager is mobile-responsive, meaning you can access and manage your expenses from any device, including smartphones and tablets.</p>
      </div>
    </div>

    <div className="faq-item">
      <button className="faq-question" onClick={() => toggleAnswer(7)}>
        Is there a limit to the number of expenses I can add?
      </button>
      <div className="faq-answer" id="answer-7">
        <p>There is no limit to the number of expenses you can add. You can track as many expenses as you need to manage your personal finances effectively.</p>
      </div>
    </div>

    <div className="faq-item">
      <button className="faq-question" onClick={() => toggleAnswer(8)}>
        Do I need to pay to use the Personal Finance Manager?
      </button>
      <div className="faq-answer" id="answer-8">
        <p>The platform is free to use for basic expense management. However, we offer premium features for users who need advanced functionalities.</p>
      </div>
    </div>

    <div className="faq-item">
      <button className="faq-question" onClick={() => toggleAnswer(9)}>
        How can I contact support if I need help?
      </button>
      <div className="faq-answer" id="answer-9">
        <p>If you have any questions or need assistance, you can reach out to our support team via the "Contact Us" section or email us at support@financeapp.com.</p>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default HomePage;
