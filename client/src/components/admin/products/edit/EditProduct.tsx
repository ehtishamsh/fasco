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
import { renderCategoryFields } from "../RenderFields";

const formSchema = z.object({
  ProductName: z
    .string()
    .min(1, "Product Name is required")
    .max(40, "Product Name is too long"),
  Price: z.string().min(1, "Price is required"),

  Stock: z.coerce.number().min(1, "Stock is required"),
  Description: z.string().min(1, "Description is required"),
  discounted: z.string().optional(),
  //Smartphone & Laptop
  screenSize: z.string().nullable(),
  cpu: z.string().nullable(),
  ram: z.string().nullable(),
  cores: z.string().nullable(),
  mainCamera: z.string().nullable(),
  frontCamera: z.string().nullable(),
  battery: z.string().nullable(),
  //Smartwatch
  features: z.string().nullable(),
  connectivity: z.string().nullable(),
  sensor: z.string().nullable(),
  screenType: z.string().nullable(),
  //Camera
  lens: z.string().nullable(),
  zoom: z.string().nullable(),
  megapixels: z.string().nullable(),
  aperture: z.string().nullable(),
  videoResolution: z.string().nullable(),
  //maxResolution: z.string().nullable(),
  //  features: z.string().nullable(),

  //Headphones
  type: z.string().nullable(),
  noiseCancellation: z.boolean(),
  batteryLife: z.string().nullable(),
  wireless: z.boolean(),
  microphone: z.boolean(),
  //Gaming
  storage: z.string().nullable(),
  gpu: z.string().nullable(),
  maxResolution: z.string().nullable(),
  numberOfControllers: z.string().nullable(),
  compatibleGames: z.string().nullable(),
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
      discounted: "",
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
        form.setValue("discounted", data.data.discounted);
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
        form.setValue("storage", data.data.storage);
        form.setValue("gpu", data.data.gpu);
        form.setValue("maxResolution", data.data.maxResolution);
        form.setValue("numberOfControllers", data.data.numberOfControllers);
        form.setValue("compatibleGames", data.data.compatibleGames);
        form.setValue("zoom", data.data.zoom);

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newProduct = {
      id: product?.id,
      title: values.ProductName,
      price: values.Price,
      discounted: values.discounted,
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
      storage: values.storage,
      gpu: values.gpu,
      maxResolution: values.maxResolution,
      numberOfControllers: values.numberOfControllers,
      compatibleGames: values.compatibleGames,
      colors,
      slug: values.ProductName.toLowerCase().replace(/ /g, "-"),
    };

    try {
      const res = await fetch(`http://localhost:4000/api/products/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();

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
          <div className="flex flex-col gap-2 mt-2">
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
                name="discounted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discounted Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Discounted Price..."
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
              {renderCategoryFields(selectCategory?.name as any, form)}
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
