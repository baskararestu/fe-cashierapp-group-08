import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    pagination: {
      current: 0,
      total: 0,
    },
    categories: [],
    selectedProduct: null,
    cartItems: [],
    totalPrice: 0,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setPagination: (state, action) => {
      state.pagination = action.payload
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    setCartItems: (state, action) => {
      // console.log(action.payload)
      // console.log(state.cartItems)
      const newItem = action.payload
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id_product === newItem.id_product
      )
      console.log(existingItemIndex)
      if (existingItemIndex !== -1) {
        if (
          newItem.quantity < 0 &&
          state.cartItems[existingItemIndex].quantity === 1
        ) {
          // remove item from cart
          state.cartItems = state.cartItems.filter(
            (item) => item.id_product !== newItem.id_product
          )
          return
        }
        // If the product already exists in the cart, update its quantity 1 | -1
        state.cartItems[existingItemIndex].quantity += newItem.quantity
      } else {
        // If the product doesn't exist in the cart, add it as a new item
        state.cartItems.push(newItem)
      }
      // Update total price
      state.totalPrice = state.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    },

    removeCartItem: (state, action) => {
      const id_product = action.payload

      // Find the index of the item to remove
      const indexToRemove = state.cartItems.findIndex(
        (item) => item.id_product === id_product
      )
      console.log(indexToRemove)

      if (indexToRemove !== -1) {
        // Remove the item from the cart
        state.cartItems.splice(indexToRemove, 1)
      }

      // Update total price
      state.totalPrice = state.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    },

    clearCart: (state) => {
      state.cartItems = []
      state.totalPrice = 0
    },
  },
})

export const {
  setProducts,
  setPagination,
  addProduct,
  setCategories,
  setProduct,
  setCartItems,
  removeCartItem,
  clearCart,
} = productSlice.actions

export default productSlice.reducer

export function fetchProducts(page) {
  return async (dispatch) => {
    try {
      // axios with auth jwt
      const response = await axios.get(
        `http://localhost:3000/product?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
          },
        }
      )
      dispatch(setProducts(response.data.data))
      dispatch(setPagination(response.data.pages))
    } catch (error) {
      console.error(error)
      alert('An error occurred. Please try again later.')
    }
  }
}

export function addProductAsync(product) {
  return async (dispatch) => {
    console.log(product)
    try {
      const response = await axios.post(
        'http://localhost:3000/product/add-product',
        product,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
          },
        }
      )
      dispatch(addProduct(response.data))
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error)
      alert('An error occurred. Please try again later.')
    }
  }
}

export function editProductAsync(id) {
  return async (dispatch) => {
    // Use the productId argument to construct the API URL
    try {
      const response = await axios.put(
        `http://localhost:3000/product/edit/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
          },
        }
      )
      dispatch(addProduct(response.data))
    } catch (error) {
      console.error(error)
      alert('An error occurred. Please try again later.')
    }
  }
}

export function getCategories() {
  return async (dispatch) => {
    // Fetch categories
    const categoryResponse = await axios.get(
      `http://localhost:3000/category/get-category`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
      }
    )
    dispatch(setCategories(categoryResponse.data.data))
  }
}
export function fetchProductById(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
      })
      dispatch(setProduct(response.data)) // dispatch setProduct action with fetched product
    } catch (error) {
      console.error(error)
      alert('An error occurred. Please try again later.')
    }
  }
}

export function editProductById(id, productData) {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `http://localhost:3000/product/edit/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
          },
        }
      )
      dispatch(setProducts(response.data)) // dispatch setProduct action with fetched product
      dispatch(fetchProducts()) // refresh our products list
    } catch (error) {
      console.error(error)
      // alert("An error occurred. Please try again later.");
      toast.error('Failed to update product data')
    }
  }
}
export function deleteProduct(productId) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
          },
        }
      )
      // setTimeout(() => {
      const updatedProducts = getState().product.products.filter(
        (product) => productId !== product.id_product
      )
      dispatch(setProducts(updatedProducts))
      // }, 1000);
      console.log(response.data)
    } catch (error) {
      console.error(error)
      // alert("An error occurred. Please try again later.(deleted)");
    }
  }
}

export function addCartItem(product, quantity) {
  return async (dispatch) => {
    try {
      dispatch(
        setCartItems({
          id_product: product.id_product,
          name: product.name,
          quantity: quantity,
          price: product.price,
        })
      ) // dispatch setCartItems action with fetched product and quantity
    } catch (error) {
      console.error(error)
      alert('An error occurred. Please try again later.')
    }
  }
}

export function checkoutItems(cart, totalPrice) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/transaction/add-transaction',
        {
          items: cart,
          total_amount: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
          },
        }
      )
      toast.success('Checkout Succed')
      console.log(response.data)
      dispatch(clearCart()) // clear the cart if the request is successful
    } catch (error) {
      console.error(error)
    }
  }
}
