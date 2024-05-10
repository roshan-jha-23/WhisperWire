"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";

function page() {
    const [username,setUsername]=useState('');
    const [usernameMessage,setUsernameMessage]=useState('');
    const [isCheckingUsername,setIsCheckingUsername]=useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

  return <div>Page</div>;
}

export default page;
