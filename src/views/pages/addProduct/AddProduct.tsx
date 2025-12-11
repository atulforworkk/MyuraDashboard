import React, { useState } from "react";
import {
  TextInput,
  Textarea,
  NumberInput,
  Select,
  FileInput,
  Button,
  Group,
  Stack,
  Paper,
  Text,
  Divider,
  Badge,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

type Variant = {
  id: string;
  title: string;
  sku?: string;
  price: number | null;
  inventory: number | null;
};

const templateVariants: Variant[] = [
  { id: "v-1", title: "Default Title", sku: "", price: null, inventory: null },
];

type FormValues = {
  title: string;
  vendor: string;
  type: string;
  price: number | null;
  inventory: number | null;
  sku: string;
  description: string;
  tags: string;
};

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[] | null>(null);
  const [status, setStatus] = useState<"Active" | "Draft" | "Archived">(
    "Active"
  );
  const [variants, setVariants] = useState<Variant[]>(templateVariants);

  const form = useForm<FormValues>({
    initialValues: {
      title: "",
      vendor: "",
      type: "",
      price: null,
      inventory: null,
      sku: "",
      description: "",
      tags: "",
    },

    validate: {
      title: (value) => (value.length > 0 ? null : "Title is required"),
    },
  });

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: `v-${Date.now()}`,
        title: `Variant ${prev.length + 1}`,
        sku: "",
        price: null,
        inventory: null,
      },
    ]);
  };

  const removeVariant = (id: string) => {
    setVariants((prev) => prev.filter((x) => x.id !== id));
  };

  const updateVariant = (id: string, patch: Partial<Variant>) => {
    setVariants((prev) =>
      prev.map((x) => (x.id === id ? { ...x, ...patch } : x))
    );
  };

  const handleSubmit = (values: FormValues) => {
    const payload = {
      title: values.title,
      vendor: values.vendor,
      type: values.type,
      description: values.description,
      tags: values.tags ? values.tags.split(",").map((t) => t.trim()) : [],
      status,
      images: images ? images.map((f) => f.name) : [],
      variants: variants.map((v) => ({ ...v })),
    };

    // TODO: call API to save product. For now just log and navigate back
    console.log("Saving product", payload);
    navigate("/home/products");
  };

  // helper to convert nullable numbers for NumberInput value prop

  const normalizeNumber = (
    value: string | number | null | undefined
  ): number | null => {
    if (value === null || value === undefined) return null;
    if (typeof value === "number") return value;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  };
  const toNumberInputValue = (n: number | null): number | undefined =>
    n === null ? undefined : n;

  return (
    <Stack>
      <Group align="center">
        <div>
          <Text size="xl">Add product</Text>
          <Text size="sm" color="dimmed">
            Create a product listing similar to Shopify's product form.
          </Text>
        </div>

        <Group>
          <Button variant="default" onClick={() => navigate("/home/products")}>
            Cancel
          </Button>
          {/* main submit button – use type="submit" inside form instead of calling form.submit */}
          <Button form="add-product-form" type="submit">
            Save
          </Button>
        </Group>
      </Group>

      <Paper withBorder radius="md" p="md">
        {/* give the form an id so the header Save button with form= can submit it too */}
        <form id="add-product-form" onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Title"
              placeholder="Product title"
              {...form.getInputProps("title")}
            />

            <Textarea
              label="Description"
              placeholder="Describe your product"
              {...form.getInputProps("description")}
              minRows={4}
            />

            <Group grow>
              <TextInput
                label="Vendor"
                placeholder="Vendor name"
                {...form.getInputProps("vendor")}
              />
              <TextInput
                label="Product type"
                placeholder="e.g. Phone case, Supplement"
                {...form.getInputProps("type")}
              />
            </Group>

            <Group grow>
              <NumberInput
                label="Price (INR)"
                value={toNumberInputValue(form.values.price)}
                onChange={(val) =>
                  form.setFieldValue("price", normalizeNumber(val))
                }
                min={0}
              />

     
<NumberInput
  label="Inventory"
  value={toNumberInputValue(form.values.inventory)}
  onChange={(val) =>
    form.setFieldValue("inventory", normalizeNumber(val))
  }
  min={0}
/>
            </Group>

            <TextInput
              label="SKU (optional)"
              placeholder="Stock keeping unit"
              {...form.getInputProps("sku")}
            />

            <FileInput
              label="Images"
              placeholder="Upload product images"
              multiple
              accept="image/*"
              value={images ?? undefined}
              onChange={(files) => setImages(files ?? null)}
            />

            <Text size="sm">Status</Text>
            <Group>
              <Button
                variant={status === "Active" ? "filled" : "outline"}
                onClick={() => setStatus("Active")}
              >
                Active
              </Button>
              <Button
                variant={status === "Draft" ? "filled" : "outline"}
                onClick={() => setStatus("Draft")}
              >
                Draft
              </Button>
              <Button
                variant={status === "Archived" ? "filled" : "outline"}
                onClick={() => setStatus("Archived")}
              >
                Archived
              </Button>
            </Group>

            <Divider />

            <Group align="center">
              <Text size="lg">Variants</Text>
              <Button size="xs" onClick={addVariant}>
                Add variant
              </Button>
            </Group>

            <Stack>
              {variants.map((v) => (
                <Paper withBorder radius="sm" p="sm" key={v.id}>
                  <Group align="flex-start">
                    <Stack style={{ flex: 1 }}>
                      <TextInput
                        value={v.title}
                        onChange={(e) =>
                          updateVariant(v.id, { title: e.currentTarget.value })
                        }
                        placeholder="Variant title"
                      />
                      <Group>
                        <TextInput
                          placeholder="SKU"
                          value={v.sku}
                          onChange={(e) =>
                            updateVariant(v.id, { sku: e.currentTarget.value })
                          }
                        />
                        <NumberInput
                          placeholder="Price"
                          value={v.price ?? undefined}
                          onChange={(val) =>
                            updateVariant(v.id, { price: normalizeNumber(val) })
                          }
                          min={0}
                        />

                        <NumberInput
                          placeholder="Inventory"
                          value={v.inventory ?? undefined}
                          onChange={(val) =>
                            updateVariant(v.id, {
                              inventory: normalizeNumber(val),
                            })
                          }
                          min={0}
                        />
                      </Group>
                    </Stack>

                    <Group>
                      <Button
                        size="xs"
                        color="red"
                        onClick={() => removeVariant(v.id)}
                      >
                        Remove
                      </Button>
                    </Group>
                  </Group>
                </Paper>
              ))}
            </Stack>

            <Divider />

            <Group>
              <Text size="sm" color="dimmed">
                Search engine listing preview
              </Text>
              <Badge>{status}</Badge>
            </Group>

            <Group>
              <Button
                variant="default"
                onClick={() => navigate("/home/products")}
              >
                Cancel
              </Button>
              <Button type="submit">Save product</Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
};

export default AddProduct;
