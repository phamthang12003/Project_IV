export const OrderStatus = {
  0: "New",
  1: "Transported",
  2: "Complete",
  "-1": "Cancel",
};

export const OrderStatusColor = {
  0: "#FDA403",
  1: "blue",
  2: "green",
  "-1": "red",
};

export const UserRole = {
  admin: "admin",
  customer: "customer",
};

export const convertStatus = (status) => {
  return OrderStatus[status];
};

export const colorStatus = (status) => {
  return OrderStatusColor[status];
};

export const getBlobImg = (file) =>
  new Promise((resolve, reject) => {
    try {
      if (!file) return;

      const reader = new FileReader();

      const objURL = URL.createObjectURL(file);

      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve({
          url: objURL,
          id: file.lastModified,
        });
      };
    } catch (error) {
      reject(error);
    }
  });
