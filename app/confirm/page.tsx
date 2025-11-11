"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ConfirmScreen, { Product } from "../../components/confirm-screen"
import type { PlacedItem, BoxSize, BoxType } from "@/types/types"

export default function ConfirmPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [boxSize, setBoxSize] = useState<BoxSize>("10x10")
  const [selectedBoxType, setSelectedBoxType] = useState<BoxType | null>(null)
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // SessionStorage から配置済みアイテム、ボックスサイズ、ボックスタイプを取得
    const placedItemsJson = sessionStorage.getItem("placedItems")
    const boxSizeStr = sessionStorage.getItem("boxSize") as BoxSize | null
    const selectedBoxTypeJson = sessionStorage.getItem("selectedBoxType")
    
    if (placedItemsJson) {
      try {
        const items: PlacedItem[] = JSON.parse(placedItemsJson)
        setPlacedItems(items)
        
        // PlacedItem を Product に変換
        // 同じ商品が複数個ある場合は qty を増やす
        const productMap = new Map<string, Product>()
        
        items.forEach((item) => {
          if (item.type === "sweet") {
            if (productMap.has(item.itemId)) {
              const existing = productMap.get(item.itemId)!
              existing.qty += 1
              existing.price += (item.price || 0)
            } else {
              productMap.set(item.itemId, {
                id: item.itemId,
                name: item.name,
                qty: 1,
                price: item.price || 0,
                image: item.imageUrl,
              })
            }
          }
        })
        
        setProducts(Array.from(productMap.values()))
      } catch (error) {
        console.error("Failed to parse placedItems:", error)
        setProducts([])
      }
    } else {
      setProducts([])
    }
    
    if (boxSizeStr) {
      setBoxSize(boxSizeStr)
    }
    
    if (selectedBoxTypeJson) {
      try {
        setSelectedBoxType(JSON.parse(selectedBoxTypeJson))
      } catch (error) {
        console.error("Failed to parse selectedBoxType:", error)
      }
    }
    
    setIsLoading(false)
  }, [])

  function onBack() {
    router.back()
  }

  function onPurchase() {
    router.push("/purchase")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">読込中...</div>
      </div>
    )
  }

  return (
    <ConfirmScreen
      products={products}
      placedItems={placedItems}
      boxSize={boxSize}
      selectedBoxType={selectedBoxType}
      onBack={onBack}
      onPurchase={onPurchase}
    />
  )
}
