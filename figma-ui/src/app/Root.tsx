import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import BottomNav from "./components/BottomNav";
import { Member } from "./types";

export default function Root() {
  const navigate = useNavigate();
  const [currentMember, setCurrentMember] = useState<Member | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const loadMemberData = () => {
      // Load member data
      const membersData = JSON.parse(localStorage.getItem("members") || "[]");
      const currentMemberId = localStorage.getItem("currentMemberId") || "1";
      let member = membersData.find((m: Member) => m.id === currentMemberId);
      
      if (!member && membersData.length > 0) {
        member = membersData[0];
      } else if (!member) {
        member = { 
          id: "1", 
          name: "张三", 
          relation: "本人", 
          gender: "male", 
          birthDate: "1990-01-01", 
          bloodType: "O", 
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150" 
        };
      }
      
      setCurrentMember(member);
    };

    loadMemberData();
    
    // Allow updating currentMember if other pages change it in localStorage
    window.addEventListener("storage", loadMemberData);
    return () => window.removeEventListener("storage", loadMemberData);
  }, [navigate]);

  if (!currentMember) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <Outlet context={{ currentMember }} />
      <BottomNav />
    </div>
  );
}
