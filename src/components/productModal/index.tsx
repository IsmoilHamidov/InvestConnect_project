
import { ModalProps } from "../../interface"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
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
                        <Button
                            className="absolute top-5 right-4 bg-transparent hover:bg-[#749BA9] text-black text-3xl hover:text-white shadow-none "
                            onClick={onClose}
                        >
                            X
                        </Button>
                        <h2 className="text-xl font-bold mb-4">Add Product</h2>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                Product Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tel" className="block text-sm font-medium text-gray-900">
                                Product Price
                            </label>
                            <Input
                                id="price"
                                name="price"
                                type="text"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tel" className="block text-sm font-medium text-gray-900">
                                Product Category
                            </label>
                            <Input
                                id="category"
                                name="category"
                                type="text"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                                required
                            />
                        </div>
                        <div className="flex justify-center w-full">
                            <Button
                                type="submit"
                                className="text-white bg-[#749BA9] hover:bg-[#52717c] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
                            >
                                Added Product
                            </Button>
                        </div>
                    </Card>
                </div>

            )}
        </>
    )
}

export default ProductModal