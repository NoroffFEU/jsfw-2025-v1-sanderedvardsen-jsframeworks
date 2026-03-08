"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <main className="max-w-[1100px] mx-auto px-5 py-8 pb-16 w-full">
        <div className="text-center py-20 px-4">
          <div className="w-16 h-16 mx-auto mb-5 bg-accent text-white rounded-full flex items-center justify-center text-3xl">
            ✉
          </div>
          <h1 className="text-3xl font-bold mb-2">Message Sent!</h1>
          <p className="text-muted mb-8 max-w-[400px] mx-auto">
            Thank you for reaching out. We&apos;ll get back to you soon.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="inline-block bg-accent text-white py-3 px-7 rounded-[10px] text-[0.95rem] font-semibold hover:bg-accent-hover transition-colors cursor-pointer border-none"
          >
            Send Another Message
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1100px] mx-auto px-5 py-8 pb-16 w-full">
      <div className="max-w-[520px] mx-auto">
        <h1 className="text-3xl font-bold mb-1">Get in Touch</h1>
        <p className="text-muted mb-8">
          Have a question or feedback? Fill out the form below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-sm font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName")}
              placeholder="Your full name"
              className="py-2.5 px-3.5 border border-line rounded-lg text-[0.92rem] bg-card outline-none transition-colors duration-200 focus:border-accent font-[inherit]"
            />
            {errors.fullName && (
              <span className="text-sale text-[0.8rem]">{errors.fullName.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="subject" className="text-sm font-semibold">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              {...register("subject")}
              placeholder="What is this about?"
              className="py-2.5 px-3.5 border border-line rounded-lg text-[0.92rem] bg-card outline-none transition-colors duration-200 focus:border-accent font-[inherit]"
            />
            {errors.subject && (
              <span className="text-sale text-[0.8rem]">{errors.subject.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="your@email.com"
              className="py-2.5 px-3.5 border border-line rounded-lg text-[0.92rem] bg-card outline-none transition-colors duration-200 focus:border-accent font-[inherit]"
            />
            {errors.email && (
              <span className="text-sale text-[0.8rem]">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm font-semibold">
              Message
            </label>
            <textarea
              id="message"
              {...register("message")}
              placeholder="Write your message here..."
              rows={5}
              className="py-2.5 px-3.5 border border-line rounded-lg text-[0.92rem] bg-card outline-none transition-colors duration-200 focus:border-accent font-[inherit] resize-y"
            />
            {errors.message && (
              <span className="text-sale text-[0.8rem]">{errors.message.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-accent text-white border-none py-3.5 rounded-[10px] text-base font-semibold cursor-pointer hover:bg-accent-hover transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
