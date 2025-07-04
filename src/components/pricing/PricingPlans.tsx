"use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";

// actions
//import { checkIsPremiumUser } from "@/actions/checkIsPremiumUser";

// hooks
//import { useCurrentUserSession } from "@/hooks/useCurrentUserSession";

// 3rd party
//import { useQuery } from "@tanstack/react-query";
import { LuIndianRupee } from "react-icons/lu";

const pricingArray = [
  {
    title: "Free",
    price: 0,
    limit: "1 jobs / Day",
  },
  {
    title: "Monthly",
    price: 499,
    limit: " 5 jobs / Day",
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK,
  },
  {
    title: "Yearly",
    price: 3999,
    limit: "5 jobs / Day",
    discount: 1989,
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PLAN_LINK,
  },
];

interface PricingCardProps {
  title: string;
  price: number;
  limit: string;
  discount?: number | undefined;
  //   paymentLink?: string;
  //   isPremium: boolean | undefined;

  userID?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  limit,
  discount,
  //   paymentLink = "/",
  //   isPremium,
  //   userID,
}) => {
  console.log(title, process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK);

  const linkClass =
    "rounded-custom text-center bg-primaryBtnColor text-primaryBtnTextColor hover:bg-primaryBtnHover font-medium transition-colors p-4 w-full mt-8 rounded";

  const getBuyLink = (): React.ReactNode => {
    // if (!userID) {
    //   return (
    //     <Link href="/sign-in" className={linkClass}>
    //       Buy now
    //     </Link>
    //   );
    // }

    if (title === "Free") {
      return (
        <Link href="/jobs" className={linkClass}>
          Get started
        </Link>
      );
    }

    // if (!isPremium && title !== "Free") {
    //   return (
    //     <Link target="_blank" href={paymentLink} className={linkClass}>
    //       Buy now
    //     </Link>
    //   );
    // }

    // if (isPremium) {
    //   return (
    //     <Link href="/jobs" className={linkClass}>
    //       Buy now
    //     </Link>
    //   );
    // }

    return null;
  };

  return (
    <div className="relative overflow-hidden rounded border shadow-card w-full flex flex-col items-center justify-between px-4 py-8 sm:px-8 sm:py-16">
      <div className="flex flex-col items-center">
        <p className="text-xl font-semibold">{title}</p>
        <p className="flex items-start my-8">
          <LuIndianRupee />
          <span className="font-bold text-4xl">{price}</span>
        </p>
        <p>{limit}</p>
        {discount && (
          <p className="mt-4 flex items-center">Discount : 1989 INR</p>
        )}
      </div>
      {/* Buy link */}
      {getBuyLink()}

      {title === "Yearly" && (
        <span className="absolute bg-primary text-primaryBtnTextColor px-4 py-2 top-0 -left-16 w-full text-center pr-[104px] font-bold -rotate-45">
          Popular
        </span>
      )}
    </div>
  );
};

export default function PricingPlans() {
  //const { userID, userEmail } = useCurrentUserSession();
  //   const router = useRouter();

  //   const { data: response } = useQuery({
  //     queryKey: ["isPremium"],
  //     queryFn: async () => checkIsPremiumUser(userID),
  //   });

  //   const isPremium = response?.data?.premium;

  //   useEffect(() => {
  //     if (response?.data?.premium) router.push("/jobs");
  //   }, [response]);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
      {pricingArray.map((item) => {
        return (
          <PricingCard
            key={item.title}
            title={item.title}
            price={item.price}
            limit={item.limit}
            discount={item.discount}
            // paymentLink={item.paymentLink + "?prefilled_email=" + userEmail}
            // isPremium={isPremium}
            // userID={userID}
          />
        );
      })}
    </div>
  );
}
