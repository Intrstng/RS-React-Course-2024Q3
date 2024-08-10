"use client";

export default function ErrorWrapper({ error }: { error: Error }) {
  return <h2>Error occurred! {error.message}</h2>;
}