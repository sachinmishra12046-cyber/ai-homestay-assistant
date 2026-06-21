import { Button, Input, Modal, Loader } from "@/components/ui";

export default function ComponentsDemo() {
  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">
        Components Demo
      </h1>

      <Input placeholder="Enter Name" />

      <Button text="Click Me" />

      <Loader />

      <Modal
        isOpen={true}
        title="Demo Modal"
      />
    </div>
  );
}