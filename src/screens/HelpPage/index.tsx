import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import "../../scss/help.scss";
import { Close, Home } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { sweetTopSmallSuccessAlert } from "../../app/lib/sweetAlert";
const HelpPage = () => {
  /*INITIALIZATIONS*/
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  const navigate = useNavigate();
  const faq_data = [
    {
      question: "Are my personal details and payment information secure?",
      answer:
        " Yes, we prioritize the security of your information. Our website uses SSL encryption for secure data transmission, and we adhere to strict privacy policies.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept a variety of payment methods, including credit/debit cards, PayPal, and other secure payment gateways. You can view all available options during the checkout process.",
    },
    {
      question: "How can I track my order?",
      answer:
        " Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number to track your order on our website or the respective courier's site.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Our return policy allows you to return items within 30 days of receiving your order. Please visit our 'Returns' page for detailed instructions and eligibility criteria.",
    },
    {
      question: "How do I cancel an order?",
      answer:
        "Orders can be canceled within a short period after placing them. Visit your order history or contact our customer support for assistance. Note that we process orders quickly, so act promptly.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we offer international shipping. Shipping costs and delivery times vary based on your location. You can calculate shipping costs during the checkout process.",
    },
    {
      question: " How can I reset my password?",
      answer: ` You can reset your password on the login page by clicking the "Forgot Password" link. Follow the instructions sent to your registered email to create a new password.`,
    },
    {
      question: "Can I modify my order after it has been placed?",
      answer:
        "Once an order is confirmed, modifications are challenging. Contact our customer support immediately for assistance, and we'll do our best to accommodate your request.",
    },
    {
      question: "What if the item I want is out of stock?",
      answer:
        " If an item is out of stock, you can sign up for notifications to receive an email when it becomes available again. We regularly restock popular items.",
    },
    {
      question:
        "How do I subscribe to your newsletter for updates and promotions?",
      answer:
        "You can subscribe to our newsletter by entering your email address in the subscription box on our homepage. Stay tuned for exclusive offers, promotions, and product updates.",
    },
    {
      question: " Can I change my shipping address after placing an order?",
      answer:
        "Contact our customer support immediately if you need to change your shipping address. We'll assist you in updating the information if the order hasn't been shipped yet.",
    },
    {
      question: " Do you offer bulk or wholesale discounts?",
      answer:
        " Yes, we provide bulk or wholesale discounts for certain products. Contact our sales team at puppyhome@gmail.com for more information on pricing and eligibility.",
    },
    {
      question: " How can I place an order on your website?",
      answer:
        "A: To place an order, simply browse our products, add items to your cart, and proceed to checkout. Follow the steps to provide shipping information and payment details.",
    },
  ];
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  /*HANDLERS*/
  const submitHandler = () => {
    if (name !== "" && email !== "" && message !== "") {
      setName("");
      setEmail("");
      setMessage("");
      sweetTopSmallSuccessAlert("Sent successfully", 800, false);
    }
  };
  return (
    <div className="help_page">
      <Box
        sx={{ backgroundImage: "URL(/images/header_img/chapter_header.jpg)" }}
        className="help_header"
      >
        <Box className="header_filter" />
      </Box>
      <Container className="help_container">
        <Box className="dir_box">
          <Box onClick={() => navigate("/")} className="dir_link">
            <Home />
            <p>Home</p>
          </Box>
          <p className="link_div">/</p>
          <Box className="dir_link">
            <p className="before_icon">Help</p>
            <Close onClick={() => navigate("/")} className="close" />
          </Box>
        </Box>
        <Stack className="main_box">
          <h4 className="faq_title">FAQ</h4>
          <Box className="faq_box">
            {faq_data.map(({ question, answer }, id) => {
              return (
                <Accordion className="accord_box" key={id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <p>{question}</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p> {answer}</p>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
          <h4 className="faq_title">Leave a Message to Admin</h4>
          <Box className="contact_box">
            <label htmlFor="name">Name</label>
            <input
              required
              id="name"
              className="name_input"
              autoComplete="off"
              placeholder="Enter your name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              required
              id="email"
              placeholder="Enter your email"
              className="email_input"
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="content">Message</label>

            <textarea
              required
              id="content"
              cols={30}
              rows={10}
              placeholder="type message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <Box className="btn_wrap">
              <Button onClick={submitHandler} className="submit_btn">
                Submit
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default HelpPage;
