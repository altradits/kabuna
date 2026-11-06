"use client";

import type { Address } from "@spree/sdk";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AddressBlock } from "@/components/order/AddressBlock";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/ui/product-image";
import { formatFiat, formatSats } from "@/lib/bitcoin/rates";
import type { PublicKabunaOrder } from "@/lib/data/bitcoin-orders";

interface BitcoinOrderReceiptProps {
  order: PublicKabunaOrder;
  basePath: string;
}

export function BitcoinOrderReceipt({
  order,
  basePath,
}: BitcoinOrderReceiptProps) {
  const t = useTranslations("orderPlaced");
  const tc = useTranslations("common");

  const shippingAddress = order.shippingAddress as unknown as Address | null;
  const billingAddress = order.billingAddress as unknown as Address | null;
  const customerName =
    billingAddress?.full_name || shippingAddress?.full_name || "";

  return (
    <div className="py-8 max-w-2xl mx-auto" data-testid="bitcoin-receipt">
      {/* Success Header */}
      <div className="text-center mb-10">
        <CircleCheckBig className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {customerName
            ? t("thanksForOrder", { name: customerName.split(" ")[0] })
            : t("thanksForOrderAnonymous")}
        </h1>
        <p className="text-gray-500">
          {t("orderNumber", { number: order.number })}
        </p>
        <p className="text-sm text-gray-400 mt-2">{t("emailConfirmation")}</p>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {t("orderItems")}
          </h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {order.items.map((item, index) => (
            <li
              key={`${item.variantId ?? item.name}-${index}`}
              className="px-6 py-4 flex gap-4"
            >
              <div className="relative w-14 h-14 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                <ProductImage
                  src={item.thumbnailUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  iconClassName="w-6 h-6"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {t("qty", { quantity: item.quantity })}
                </p>
              </div>
              <div className="text-sm font-medium text-gray-900">
                {item.total}
              </div>
            </li>
          ))}
        </ul>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">
            {t("bitcoinAmountPaid")}
          </span>
          <span className="text-sm font-bold text-gray-900">
            {formatFiat(order.fiatTotalCents, order.currency)}
          </span>
        </div>
      </div>

      {/* Lightning payment */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            {t("bitcoinTitle")}
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-gray-500">{t("bitcoinAmountPaid")}</dt>
              <dd className="font-medium text-gray-900">
                {formatSats(order.sats)} sats
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-gray-500">{t("bitcoinDestination")}</dt>
              <dd className="font-medium text-gray-900 break-all text-right">
                {order.lightningAddress}
              </dd>
            </div>
            {order.paymentHash && (
              <div className="flex items-start justify-between gap-4">
                <dt className="text-gray-500 flex-shrink-0">
                  {t("bitcoinReference")}
                </dt>
                <dd
                  className="font-mono text-xs text-gray-900 break-all text-right"
                  data-testid="bitcoin-receipt-hash"
                >
                  {order.paymentHash}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Contact & Addresses */}
      {(shippingAddress || billingAddress || order.email) && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          {(shippingAddress || billingAddress) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              {shippingAddress && (
                <div className="px-6 py-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    {t("shippingAddress")}
                  </h3>
                  <AddressBlock address={shippingAddress} />
                </div>
              )}
              {billingAddress && (
                <div className="px-6 py-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    {t("billingAddress")}
                  </h3>
                  <AddressBlock address={billingAddress} />
                </div>
              )}
            </div>
          )}
          {order.email && (
            <div className="px-6 py-3 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                {t("confirmationSentTo")}{" "}
                <span className="font-medium text-gray-700">{order.email}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="text-center">
        <Button size="lg" asChild>
          <Link href={`${basePath}/`}>{tc("continueShopping")}</Link>
        </Button>
      </div>
    </div>
  );
}
