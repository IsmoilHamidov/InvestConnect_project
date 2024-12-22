
import { ModalProps } from "../../interface"
import { Card } from "../ui/card"
import CreateProductForm from "../CreateProductForm"
import { HiX } from "react-icons/hi"
const ProductModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center px-5 z-50"
                    onClick={onClose}
                >
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 opacity-100"
                        style={{ zIndex: 50 }}
                    />
                    <Card
                        className="bg-white p-6 rounded-lg shadow-lg w-96 relative transform transition-transform duration-500 scale-100"
                        onClick={(e) => e.stopPropagation()}
                        style={{ zIndex: 51, boxShadow: '0px 6px 44px 0px #e9e9e9' }}
                    >
                        <div className="flex justify-between items-center pb-5">
                        <h2 className="text-xl">Add Product</h2>
                        <span
                            className="text-black hover:text-primary"
                            onClick={onClose}
                        >
                            <HiX size="25"/>
                        </span>
                        </div>
                        <CreateProductForm onClose={onClose} />
                    </Card>
                </div>

            )}
        </>
    )
}

export default ProductModal