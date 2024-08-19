import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Select from "../../Select";
import { useEffect, useMemo, useState } from "react";
import ImageUpload from "../../ImageUpload";
import { Label } from "@/components/ui/label";
import ProductVariants from "../../ProductVariants";
import ProductColor from "../../Color";
import { toast } from "@/components/ui/use-toast";
import { BreadCrumbAdmin } from "../../BreadCrumAdmin";
import { useParams } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  ProductName: z
    .string()
    .min(1, "Product Name is required")
    .max(40, "Product Name is too long"),
  Price: z.string().min(1, "Price is required"),
  Stock: z.coerce.number().min(1, "Stock is required"),
  Description: z.string().min(1, "Description is required"),
  screenSize: z.string().min(1, "Screen Size is required"),
  cpu: z.string().nullable(),
  ram: z.string().nullable(),
  cores: z.string().nullable(),
  mainCamera: z.string().nullable(),
  frontCamera: z.string().nullable(),
  battery: z.string().min(1, "Battery is required"),
  features: z.string().nullable(),
  connectivity: z.string().nullable(),
  sensor: z.string().nullable(),
  screenType: z.string().nullable(),
  lens: z.string().nullable(),
  zoom: z.string().nullable(),
  megapixels: z.string().nullable(),
  aperture: z.string().nullable(),
  videoResolution: z.string().nullable(),
  type: z.string().nullable(),
  noiseCancellation: z.boolean(),
  batteryLife: z.string().nullable(),
  wireless: z.boolean(),
  microphone: z.boolean(),
});

interface Option {
  id: string;
  name: string;
}
interface Variant {
  id: number;
  variant: string;
  price: string;
}
interface Color {
  id: string | number;
  color: string;
}

function EditProduct() {
  const [product, setProduct] = useState<any>();
  const [selectCategory, setSelectCategory] = useState<Option | undefined>();
  const [categories, setCategories] = useState<Option[]>([]);
  const [selectBrand, setSelectBrand] = useState<Option | undefined>();
  const [brands, setBrands] = useState<Option[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [colors, setColors] = useState<Color[]>([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        fetch("http://localhost:4000/api/categories"),
        fetch("http://localhost:4000/api/brands"),
      ]);
      const categoriesData = await categoriesRes.json();
      const brandsData = await brandsRes.json();
      setCategories(categoriesData.categories);
      setBrands(brandsData.brands);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const defaultValues = useMemo(
    () => ({
      ProductName: `${product?.data?.title}`,
      Price: "",
      Stock: 0,
      Description: "",
      screenSize: "",
      cpu: "",
      cores: "",
      mainCamera: "",
      frontCamera: "",
      battery: "",
      ram: "",
      features: "",
      connectivity: "",
      sensor: "",
      screenType: "",
      lens: "",
      zoom: "",
      megapixels: "",
      aperture: "",
      videoResolution: "",
      type: "",
      noiseCancellation: false,
      batteryLife: "",
      wireless: false,
      microphone: false,
    }),
    []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/products/single/${id}`
        );
        const data = await res.json();
        form.setValue("ProductName", data.data.title);
        form.setValue("Price", data.data.price);
        form.setValue("Stock", data.data.stock);
        form.setValue("Description", data.data.description);
        form.setValue("screenSize", data.data.screenSize);
        form.setValue("cpu", data.data.cpu);
        form.setValue("cores", data.data.cores);
        form.setValue("mainCamera", data.data.mainCamera);
        form.setValue("frontCamera", data.data.frontCamera);
        form.setValue("battery", data.data.battery);
        form.setValue("ram", data.data.ram);
        form.setValue("features", data.data.features);
        form.setValue("connectivity", data.data.connectivity);
        form.setValue("sensor", data.data.sensor);
        form.setValue("screenType", data.data.screenType);
        form.setValue("lens", data.data.lens);
        form.setValue("zoom", data.data.zoom);
        form.setValue("megapixels", data.data.megapixels);
        form.setValue("aperture", data.data.aperture);
        form.setValue("videoResolution", data.data.videoResolution);
        form.setValue("type", data.data.type);
        form.setValue("noiseCancellation", data.data.noiseCancellation);
        form.setValue("batteryLife", data.data.batteryLife);
        form.setValue("wireless", data.data.wireless);
        form.setValue("microphone", data.data.microphone);

        setProduct(data.data);
        setImgUrl(data.data.cover);
        setSelectCategory(
          categories.find((cat) => cat.id === data.data.category.id)
        );
        setSelectBrand(brands.find((brand) => brand.id === data.data.brand.id));
        setVariants(data?.data?.variant);
        setColors(data?.data?.color);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
    return () => {};
  }, [categories, brands]);
  console.log(product);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newProduct = {
      id: product?.id,
      title: values.ProductName,
      price: values.Price,
      stock: values.Stock,
      description: values.Description,
      categoryId: selectCategory?.id,
      brandId: selectBrand?.id,
      variants,
      cover: imgUrl,
      screenSize: values.screenSize,
      cpu: values.cpu,
      cores: values.cores,
      mainCamera: values.mainCamera,
      frontCamera: values.frontCamera,
      battery: values.battery,
      ram: values.ram,
      features: values.features,
      connectivity: values.connectivity,
      sensor: values.sensor,
      screenType: values.screenType,
      lens: values.lens,
      zoom: values.zoom,
      megapixels: values.megapixels,
      aperture: values.aperture,
      videoResolution: values.videoResolution,
      type: values.type,
      noiseCancellation: values.noiseCancellation,
      batteryLife: values.batteryLife,
      wireless: values.wireless,
      microphone: values.microphone,
      colors,
      slug: values.ProductName.toLowerCase().replace(/ /g, "-"),
    };
    console.log(newProduct);
    try {
      const res = await fetch(`http://localhost:4000/api/products/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === 200) {
        toast({
          title: "Success",
          variant: "success",
          description: "Product updated successfully",
          duration: 3000,
        });
        setTimeout(() => {
          window.location.href = "/admin/products";
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  return (
    <div className="my-10 px-10">
      {loading ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className=" flex flex-col gap-5 ">
          <div className="flex flex-col gap-2">
            <BreadCrumbAdmin paths={["Admin", "Products"]} end={"Edit"} />
            <h1 className="text-3xl font-bold tracking-tight max-sm:text-xl">
              Edit Product
            </h1>
            <span className="text-sm text-muted-foreground">
              Edit a new Product.
            </span>
          </div>
          <DropdownMenuSeparator />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-3xl mx-auto w-full"
            >
              <FormField
                control={form.control}
                name="ProductName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Product name..."
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DropdownMenuSeparator />
              <Label>Upload Product Image</Label>
              <ImageUpload filePath={imgUrl} setFilePath={setImgUrl} />
              <DropdownMenuSeparator />
              <FormField
                control={form.control}
                name="Price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product Price..."
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DropdownMenuSeparator />
              <FormField
                control={form.control}
                name="Stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product Stock..."
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DropdownMenuSeparator />
              <Label>Product Variants(Optional)</Label>
              <ProductVariants variants={variants} setVariants={setVariants} />
              <DropdownMenuSeparator />
              <Label>Product Color</Label>
              <ProductColor color={colors} setcolor={setColors} />

              <DropdownMenuSeparator />
              <Select
                options={categories}
                selectedOptions={selectCategory}
                setSelectedOptions={setSelectCategory}
                name="Category"
              />
              <DropdownMenuSeparator />
              <Select
                options={brands}
                selectedOptions={selectBrand}
                setSelectedOptions={setSelectBrand}
                name="Brand"
              />
              <DropdownMenuSeparator />
              <FormField
                control={form.control}
                name="Description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product Description..."
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DropdownMenuSeparator />
              <FormField
                control={form.control}
                name="screenSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Screen Size</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product Screen Size..."
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DropdownMenuSeparator />
              <FormField
                control={form.control}
                name="cpu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPU</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product CPU..."
                        {...field}
                        value={field.value ?? ""}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DropdownMenuSeparator />
              {(selectCategory?.name === "Laptops" ||
                selectCategory?.name === "Smartphones" ||
                selectCategory?.name === "Gaming") && (
                <>
                  <FormField
                    control={form.control}
                    name="cores"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cores</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product Cores..."
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DropdownMenuSeparator />
                  <FormField
                    control={form.control}
                    name="mainCamera"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main Camera</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product Main Camera..."
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DropdownMenuSeparator />
                  <FormField
                    control={form.control}
                    name="frontCamera"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Front Camera(Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product Front Camera..."
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DropdownMenuSeparator />
                  <FormField
                    control={form.control}
                    name="ram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ram</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product Ram..."
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {selectCategory?.name === "Smartwatches" && (
                <>
                  <FormField
                    control={form.control}
                    name="sensor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sensors</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product Sensors..."
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DropdownMenuSeparator />
                  <FormField
                    control={form.control}
                    name="screenType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Screen Type</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product Screen Type..."
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DropdownMenuSeparator />
                  <FormField
                    control={form.control}
                    name="connectivity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Connectivity</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product Connectivity..."
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DropdownMenuSeparator />
                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Features</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product Features..."
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {selectCategory?.name === "Headphones" && (
                <>
                  <FormField
                    control={form.control}
                    name="sensor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sensors</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product Sensors..."
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DropdownMenuSeparator />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product Type..."
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DropdownMenuSeparator />
                  <FormField
                    control={form.control}
                    name="batteryLife"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>batteryLife</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product battery Life..."
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DropdownMenuSeparator />
                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Features</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product Features..."
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DropdownMenuSeparator />
                  <FormField
                    control={form.control}
                    name="microphone"
                    render={({ field }) => (
                      <div className="flex flex-col gap-2">
                        <FormLabel>Microphone</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    )}
                  />
                  <DropdownMenuSeparator />
                  <FormField
                    control={form.control}
                    name="noiseCancellation"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-col gap-2">
                          <FormLabel>Noise Cancellation</FormLabel>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}
              <DropdownMenuSeparator />
              <FormField
                control={form.control}
                name="battery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Battery</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product Battery..."
                        {...field}
                        value={field.value ?? ""}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button variant="default" type="submit" className="w-full mt-6">
                Edit
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}

export default EditProduct;
