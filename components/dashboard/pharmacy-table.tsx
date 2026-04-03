"use client";

import { pharmacies, formatTZS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PharmacyTable() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h3 className="font-semibold text-foreground">Pharmacy Overview</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Pharmacy
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Subdomain
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pharmacies.slice(0, 5).map((pharmacy) => (
              <tr
                key={pharmacy.id}
                className="border-b border-border transition-colors hover:bg-muted/20"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                      <span className="text-xs font-bold">
                        {pharmacy.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">
                      {pharmacy.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {pharmacy.subdomain}.medicare.co.tz
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {pharmacy.location}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={pharmacy.status === "active" ? "default" : "secondary"}
                    className={
                      pharmacy.status === "active"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : pharmacy.status === "pending"
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                    }
                  >
                    {pharmacy.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Pharmacy Listings with more detail
export function PharmacyListings() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h3 className="font-semibold text-foreground">Pharmacy Listings</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Pharmacy Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Subdomain
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pharmacies.map((pharmacy) => (
              <tr
                key={pharmacy.id}
                className="border-b border-border transition-colors hover:bg-muted/20"
              >
                <td className="px-4 py-3 font-medium text-foreground">
                  {pharmacy.name}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {pharmacy.subdomain}.co.tz
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {pharmacy.location}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={pharmacy.status === "active" ? "default" : "secondary"}
                    className={
                      pharmacy.status === "active"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                    }
                  >
                    {pharmacy.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
