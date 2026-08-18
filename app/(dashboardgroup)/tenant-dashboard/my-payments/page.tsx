'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, Calendar, Hash, Building2, CheckCircle2, Clock, XCircle, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { PaymentService } from '@/service/payment.service';

// স্ট্যাটাস অনুযায়ী ব্যাজের রঙ ও আইকন নির্ধারণের জন্য হেল্পার ফাংশন
const getStatusConfig = (status: string) => {
  switch (status) {
    case 'PENDING':
      return {
        classes: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        icon: <Clock className="h-3 w-3" />,
      };
    case 'APPROVED':
      return {
        classes: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        icon: <CheckCircle2 className="h-3 w-3" />,
      };
    case 'REJECTED':
      return {
        classes: 'text-red-400 bg-red-500/10 border-red-500/20',
        icon: <XCircle className="h-3 w-3" />,
      };
    case 'ACTIVE':
      return {
        classes: 'text-green-400 bg-green-500/10 border-green-500/20',
        icon: <Star className="h-3 w-3" />,
      };
    case 'COMPLETED':
      return {
        classes: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20',
        icon: <CheckCircle2 className="h-3 w-3" />,
      };
    default:
      return {
        classes: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20',
        icon: <CheckCircle2 className="h-3 w-3" />,
      };
  }
};

export default function MyPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await PaymentService.getMyPayments();
        if (response.success) {
          setPayments(response.data);
        }
      } catch (error) {
        toast.error('Failed to load payment transactions');
      } finally {
        setIsFetching(false);
      }
    };

    fetchPayments();
  }, []);

  if (isFetching) {
    return <div className="text-zinc-500 text-sm animate-pulse">Loading transaction records...</div>;
  }

  return (
    <div className="space-y-6 select-none">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Payment History</h1>
        <p className="text-zinc-500 text-sm mt-1">Review your completed ledger payments and transaction receipts</p>
      </div>

      {payments.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-x-auto rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-md shadow-xl"
        >
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-950/60 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <th className="py-4 px-6"><Building2 className="inline h-4 w-4 mr-1 text-indigo-500" /> Property</th>
                <th className="py-4 px-6"><Hash className="inline h-4 w-4 mr-1 text-indigo-500" /> Transaction ID</th>
                <th className="py-4 px-6"><DollarSign className="inline h-4 w-4 mr-1 text-indigo-500" /> Amount</th>
                <th className="py-4 px-6"><Calendar className="inline h-4 w-4 mr-1 text-indigo-500" /> Date</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/60">
              {payments.map((payment) => {
                const statusConfig = getStatusConfig(payment.status);
                return (
                  <tr key={payment.id} className="hover:bg-zinc-900/10 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">{payment.rentalRequest?.property?.title}</td>
                    <td className="py-4 px-6 font-mono text-xs text-zinc-500 max-w-[150px] truncate" title={payment.transactionId}>
                      {payment.transactionId}
                    </td>
                    <td className="py-4 px-6 font-bold text-emerald-400">${payment.amount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-zinc-400">
                      {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border ${statusConfig.classes}`}>
                        {statusConfig.icon}
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <div className="p-8 rounded-2xl border border-dashed border-zinc-900 text-center text-zinc-600 text-sm">
          No transactions recorded on this account yet.
        </div>
      )}
    </div>
  );
}