
export function purchaseAsyncFb(id, successFunc, failFunc, runtime) {
    FBInstant.payments.purchaseAsync({
        productID: id,
        developerPayload: 'pegasus',
    })
    .then(function (purchase) {
        console.log("Purchase raw:", purchase);

        return FBInstant.payments.consumePurchaseAsync(purchase.purchaseToken)
            .then(function () {
                console.log("IAP Success!");
                runtime.callFunction(successFunc);
                runtime.callFunction("logGaBuySuccess");
            })
            .catch(function (e) {
                console.log("Consume failed:", e);
                runtime.callFunction(failFunc, "Unable to complete the purchase. Please try again!");
            });
    })
    .catch((e) => {
        console.log("purchaseAsync ERROR:", e);
        runtime.callFunction(failFunc, "Purchase failed or canceled!");
    });
}


/* truyền vào 4 tham số
 1: id của món hàng lấy từ FB
 2: tên function xử lý vật phẩm khi mua thành công
 3: function gọi khi mua thất bại hoặc lỗi
 4: runtime của Construct
*/
export function getPurchasesAsync(id, successFunc, failFunc, runtime) {

    FBInstant.payments.getPurchasesAsync()
        .then(purchases => {

            console.log("Purchases chưa xử lý:", purchases);

            if (purchases && purchases.length > 0) {

                // xử lý tất cả pending purchases
                purchases.forEach(p => {
                    FBInstant.payments.consumePurchaseAsync(p.purchaseToken)
                        .then(() => {
                            console.log("IAP Success (consume)!");
                            runtime.callFunction(successFunc);
                        })
                        .catch(err => {
                            console.warn("Consume purchase FAIL:", err);
                            runtime.callFunction(failFunc, "Unable to consume purchase!");
                        });
                });

            } else {
                console.log("Không có pending => gọi purchaseAsyncFb()");
                purchaseAsyncFb(id, successFunc, failFunc, runtime);
            }

        })
        .catch(err => {
            console.warn("getPurchasesAsync lỗi:", err);
            purchaseAsyncFb(id, successFunc, failFunc, runtime);
        });
}
