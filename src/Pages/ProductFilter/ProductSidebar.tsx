import ProductLocation from './productLocation'
import MultiRangeSlider from './productPrice';
import ProductSidebarCategory from './productSidebarCategory'



  type ProductSidebarProps = {
    onSelectCategory: (category: string) => void;
  };

function ProductSidebar({ onSelectCategory }: ProductSidebarProps) {

  return (
    <div className="w-full flex flex-col gap-9">
        <ProductSidebarCategory  onSelectCategory={onSelectCategory}/>
        <MultiRangeSlider 
          min={0} 
          max={500} 
          onChange={(values) => console.log(values)} 
        />
        <ProductLocation/>
  </div>
  )
}

export default ProductSidebar
