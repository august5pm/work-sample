import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function ContactView() {
  // Redux 상태
  const posts = useSelector((state) => state.posts);
  console.log(posts)

  return <h2>Contact Page</h2>
}

export default ContactView;
