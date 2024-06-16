interface IProps {
    vnpayModalState: boolean;
    setVnpayModalState: (vnpayModalState: boolean) => void;
}
const ModalVnpay = (props: IProps) => {
    const { vnpayModalState, setVnpayModalState } = props;

    return (
        <div className={`w-full ${vnpayModalState ? 'block' : 'hidden'} h-full flex
        z-50 fixed inset-0 justify-center items-center`} style={{ background: 'rgb(0 0 0 / 85%)' }}>
            <div className="p-4 w-10/12 max-h-full flex justify-center items-center mb-[100px]">
                <div className="relative w-full bg-white rounded-lg shadow dark:bg-gray-700 p-3">
                    <h3 className="text-lg font-semibold">Thông tin hóa đơn</h3>
                    <div className="table-responsive text-lg">
                        <form action="/vnpay_php/vnpay_create_payment.php" id="frmCreateOrder" method="post">
                            <div className="">
                                <label htmlFor="amount">Số tiền: </label>
                                <input className="border border-cyan-700 w-9/12 rounded-md pl-2" data-val="true" data-val-number="The field Amount must be a number." data-val-required="The Amount field is required." id="amount" max="100000000" min="1" name="amount" type="number" value="10000" />
                            </div>
                            <h4>Chọn phương thức thanh toán</h4>
                            <div className="form-group">
                                <h5>Cách 1: Chuyển hướng sang Cổng VNPAY chọn phương thức thanh toán</h5>
                                <input type="radio" checked={true} id="bankCode" name="bankCode" value="" />
                                <label htmlFor="bankCode">Cổng thanh toán VNPAYQR</label><br></br>

                                <h5>Cách 2: Tách phương thức tại site của đơn vị kết nối</h5>
                                <input type="radio" id="bankCode" name="bankCode" value="VNPAYQR" />
                                <label htmlFor="bankCode">Thanh toán bằng ứng dụng hỗ trợ VNPAYQR</label><br />

                                <input type="radio" id="bankCode" name="bankCode" value="VNBANK" />
                                <label htmlFor="bankCode">Thanh toán qua thẻ ATM/Tài khoản nội địa</label><br />

                                <input type="radio" id="bankCode" name="bankCode" value="INTCARD" />
                                <label htmlFor="bankCode">Thanh toán qua thẻ quốc tế</label><br />
                            </div>
                            <div className="form-group">
                                <h5>Chọn ngôn ngữ giao diện thanh toán:</h5>
                                <input type="radio" id="language" checked={true} name="language" value="vn" />
                                <label htmlFor="language">Tiếng việt</label><br />
                                <input type="radio" id="language" name="language" value="en" />
                                <label htmlFor="language">Tiếng anh</label><br />

                            </div>
                            <button type="submit" className="btn btn-default">Thanh toán</button>

                        </form>
                    </div>
                </div>
            </div></div>
    );
}
export default ModalVnpay;