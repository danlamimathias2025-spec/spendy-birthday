import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquarePlus, Sparkles, Send, Flame, ShieldCheck, CheckCircle2, Heart } from 'lucide-react';
import { BirthdayWish, subscribeToWishes, sendBirthdayWish } from '../firebase';

interface BirthdayWishesLedgerProps {
  partnerName: string;
  senderName: string;
}

export const BirthdayWishesLedger: React.FC<BirthdayWishesLedgerProps> = ({
  partnerName,
  senderName,
}) => {
  const [wishes, setWishes] = useState<BirthdayWish[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToWishes((fetchedWishes) => {
      setWishes(fetchedWishes);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const ok = await sendBirthdayWish(guestName.trim() || 'Well-wisher', message.trim());
    setIsSubmitting(false);

    if (ok) {
      setMessage('');
      setSuccessNotice(true);
      setTimeout(() => setSuccessNotice(false), 3000);
    }
  };

  return (
    <section className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 my-10">
      {/* Header Container */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/75 backdrop-blur-md p-5 sm:p-7 shadow-xl shadow-black/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-mono font-bold text-white tracking-wide">
                  IMMUTABLE BIRTHDAY LEDGER
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FIRESTORE LIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Real-time celebration signatures & memos dedicated to <span className="text-emerald-300 font-semibold">{partnerName}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-sm hover:shadow-emerald-500/20 active:scale-95"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{isOpen ? 'Close Form' : 'Sign Ledger'}</span>
          </button>
        </div>

        {/* Expandable Submission Form */}
        <AnimatePresence>
          {isOpen && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmitWish}
              className="pt-5 pb-2 overflow-hidden border-b border-slate-800/80 mb-5"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Your Name (e.g. Alex, Friend, Splenzzy)"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    maxLength={50}
                    className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !message.trim()}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0 shadow-lg shadow-emerald-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Posting...' : 'Send Wish'}</span>
                  </button>
                </div>
                <textarea
                  placeholder={`Write an immutable birthday wish for ${partnerName}'s Level 24 milestone...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={300}
                  rows={2}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs font-sans text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
                />
                {successNotice && (
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Wish broadcasted to Firestore ledger successfully!</span>
                  </div>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Wishes List (Lightweight, High-Speed Render) */}
        <div className="mt-5 space-y-3 max-h-72 overflow-y-auto pr-1">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className={`p-3.5 rounded-xl border transition-all ${
                wish.isGenesis
                  ? 'bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border-amber-500/30'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-white">
                    {wish.senderName}
                  </span>
                  {wish.isGenesis && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                      <ShieldCheck className="w-3 h-3 text-amber-400" />
                      Genesis Presenter
                    </span>
                  )}
                  {!wish.isGenesis && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-mono text-emerald-400">
                      <Sparkles className="w-2.5 h-2.5" /> Verified
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  {new Date(wish.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                {wish.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
