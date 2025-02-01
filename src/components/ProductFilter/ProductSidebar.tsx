import ProductLocation from './productLocation'
import ProductSidebarCategory from './productSidebarCategory'
// import MultiRangeSlider from './productPrice';



  type ProductSidebarProps = {
    onSelectCategory: (category: string) => void;
  };

function ProductSidebar({ onSelectCategory }: ProductSidebarProps) {

  return (
    <div className="w-full flex flex-col gap-9">
        <ProductSidebarCategory  onSelectCategory={onSelectCategory}/>
        <ProductLocation/>
        {/* <MultiRangeSlider 
          min={0} 
          max={500} 
          onChange={(values) => console.log(values)} 
        /> */}
  </div>
  )
}

export default ProductSidebar
