import { fetchCardData, fetchLatestInvoices } from '../../lib/data';

import { Card } from '@/app/ui/dashboard/cards';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/font';

export default async function Page() {
    const [latestInvoices, { numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices, }] = await Promise.all([
            fetchLatestInvoices(),
            fetchCardData()
        ])

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card title="Collected" value={totalPaidInvoices} type="collected" />
                <Card title="Pending" value={totalPendingInvoices} type="pending" />
                <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
                <Card
                    title="Total Customers"
                    value={numberOfCustomers}
                    type="customers"
                />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <LatestInvoices latestInvoices={latestInvoices} />
            </div>
        </main>
    )
}