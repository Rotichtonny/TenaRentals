import UserCard from "../UserCard";

export default function UserCardExample() {
  return (
    <div className="p-4">
      <UserCard
        id="1"
        fullName="John Kamau"
        email="john.kamau@email.com"
        phone="+254 712 345 678"
        role="evaluator"
        onClick={() => console.log("User card clicked")}
      />
    </div>
  );
}
