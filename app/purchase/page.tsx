"use client"

import React from "react"
import { useRouter } from "next/navigation"

export default function PurchasePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">購入が確定しました</h2>
        <p className="text-gray-600 mb-6">ご注文ありがとうございます。シミュレーターの確認画面から遷移した購入確定ページのスタブです。</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 rounded-md bg-white border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
          >
            ホームへ戻る
          </button>
          <button
            onClick={() => router.push('/confirm')}
            className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600"
          >
            確認画面へ戻る
          </button>
        </div>
      </div>
    </div>
  )
}
