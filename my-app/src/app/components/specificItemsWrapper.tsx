"use client";
import SpecificItem from "./SpecificItem";

export default function SpecificItemWrapper({ id }: { id: string }) {
  return <SpecificItem id={id} />;
}