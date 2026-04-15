/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  Users,
  SquarePlay,
  Banknote,
  BarChart3,
  SlidersHorizontal,
  Settings,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  Calendar,
  Building2,
  Activity,
  DollarSign,
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  MoreVertical,
  Heart,
  Shield,
  ListFilter,
  BriefcaseMedical,
  Wallet,
  ClipboardCheck,
  PlaySquare,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Ban,
  X,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Clock,
  Ticket,
  Mail,
  FileText,
  Globe,
  Lock,
  Trash2,
  Edit3,
  Image as ImageIcon,
  List,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  MessageSquare,
  PieChart as PieChartIcon,
  User,
  Monitor,
  Check,
  ListOrdered,
  Maximize2,
  Upload,
  Plus
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

// --- DUMMY DATA ---
const REVENUE_DATA = [
  { month: "JAN", revenue: 18000 },
  { month: "FEB", revenue: 19500 },
  { month: "MAR", revenue: 21000 },
  { month: "APR", revenue: 20000 },
  { month: "MAY", revenue: 23000 },
  { month: "JUN", revenue: 24500 }
];

const RECENT_ACTIVITY = [
  {
    id: 1,
    icon: <CheckCircle2 size={16} />,
    bg: "bg-[#2B5FC1]",
    color: "text-white",
    title: "New Organization Approved",
    desc: "St. Mary's Care Network has been verified.",
    time: "2 HOURS AGO",
    timeColor: "text-[#2B5FC1]"
  },
  {
    id: 2,
    icon: <AlertTriangle size={16} />,
    bg: "bg-[#FFF4E5]",
    color: "text-[#F59E0B]",
    title: "Subscription Expiring",
    desc: "HealthBridge Clinic's pro plan expires in 3 days.",
    time: "5 HOURS AGO",
    timeColor: "text-[#2B5FC1]"
  },
  {
    id: 3,
    icon: <UserPlus size={16} />,
    bg: "bg-[#EEF6FF]",
    color: "text-[#2B5FC1]",
    title: "New Admin Registered",
    desc: "Sarah Connor added as System Manager.",
    time: "YESTERDAY",
    timeColor: "text-[#2B5FC1]"
  }
];

const ORGANIZATIONS = [
  {
    id: 1,
    name: "Apex Medical Center",
    joined: "Joined Oct 12, 2023",
    plan: "Enterprise",
    staff: "42 Caregivers",
    status: "Active",
    icon: <Building2 size={18} />,
    iconBg: "bg-[#EEF6FF]",
    iconColor: "text-[#2B5FC1]",
    statusBg: "bg-[#EEF6FF]",
    statusText: "text-[#2B5FC1]"
  },
  {
    id: 2,
    name: "Blue Sky Pediatrics",
    joined: "Joined Oct 08, 2023",
    plan: "Professional",
    staff: "18 Caregivers",
    status: "In Review",
    icon: <Shield size={18} />,
    iconBg: "bg-[#EEF6FF]",
    iconColor: "text-[#2B5FC1]",
    statusBg: "bg-[#F3F4F6]",
    statusText: "text-[#6B7280]"
  },
  {
    id: 3,
    name: "City Heart Clinic",
    joined: "Joined Oct 05, 2023",
    plan: "Enterprise",
    staff: "115 Caregivers",
    status: "Active",
    icon: <Heart size={18} />,
    iconBg: "bg-[#EEF6FF]",
    iconColor: "text-[#2B5FC1]",
    statusBg: "bg-[#EEF6FF]",
    statusText: "text-[#2B5FC1]"
  }
];

const ORGANIZATIONS_LIST = [
  {
    id: 1,
    name: "Northwest Medical Group",
    icon: <Building2 size={18} />,
    iconBg: "bg-[#EEF6FF]",
    iconColor: "text-[#2B5FC1]",
    activeTeam: 42,
    pendingTeam: 5,
    visits: "1,208",
    region: "Oregon / WA",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Evergreen Senior Care",
    icon: <Building2 size={18} />,
    iconBg: "bg-[#FFF4E5]",
    iconColor: "text-[#A85E00]",
    activeTeam: 18,
    pendingTeam: 2,
    visits: "450",
    region: "California (N)",
    status: "ACTIVE"
  },
  {
    id: 3,
    name: "Metro Community Clinic",
    icon: <Building2 size={18} />,
    iconBg: "bg-[#FEE2E2]",
    iconColor: "text-[#EF4444]",
    activeTeam: 0,
    pendingTeam: 12,
    visits: "0",
    region: "Texas Central",
    status: "VERIFICATION"
  }
];

const CLINICAL_TEAM_LIST = [
  {
    id: 1,
    name: "Michael Jones",
    org: "Evergreen Senior Care",
    visits: "1,208",
    state: "Oregon",
    region: "WA",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "John Doe",
    org: "Evergreen Senior Care",
    visits: "450",
    state: "California",
    region: "West",
    status: "ACTIVE"
  },
  {
    id: 3,
    name: "James Doe",
    org: "Evergreen Senior Care",
    visits: "0",
    state: "Texas",
    region: "Central",
    status: "VERIFICATION"
  }
];

const GROWTH_DATA = [
  { month: "JUL", value: 40 },
  { month: "AUG", value: 55 },
  { month: "SEP", value: 70 },
  { month: "OCT", value: 85 }
];

const SUBSCRIPTION_STATS = [
  { label: "Monthly Recurring Revenue", value: "$142,380.00", icon: <CreditCard size={20} />, badge: "+12.5%", badgeBg: "bg-[#D1FAE5]", badgeText: "text-[#10B981]", iconBg: "bg-[#EEF6FF]", iconColor: "text-[#2B5FC1]" },
  { label: "Total Active Subscriptions", value: "1,284", icon: <Users size={20} />, badge: "+8.2%", badgeBg: "bg-[#D1FAE5]", badgeText: "text-[#10B981]", iconBg: "bg-[#EEF6FF]", iconColor: "text-[#2B5FC1]" },
  { label: "Average Revenue Per Unit", value: "$110.88", icon: <TrendingUp size={20} />, badge: "Stable", badgeBg: "bg-[#F1F5F9]", badgeText: "text-[#6B7280]", iconBg: "bg-[#EEF6FF]", iconColor: "text-[#2B5FC1]" },
  { label: "Expiring This Month", value: "42", icon: <Calendar size={20} />, badge: "Churn Risk", badgeBg: "bg-[#FEE2E2]", badgeText: "text-[#EF4444]", iconBg: "bg-[#EEF6FF]", iconColor: "text-[#2B5FC1]" },
];

const PLANS_DATA = [
  { id: 1, name: "Basic Plan", desc: "Small Practices", price: "$49", share: 45, features: ["Up to 50 Patients", "Standard Support"], buttonText: "Modify Basic", color: "bg-[#EEF6FF]", textColor: "text-[#2B5FC1]" },
  { id: 2, name: "Pro Plan", desc: "Clinical Groups", price: "$199", share: 38, features: ["Up to 250 Patients", "Priority Support 24/7", "Advanced Analytics"], buttonText: "Modify Pro", color: "bg-[#1E3A7B]", textColor: "text-white", popular: true },
  { id: 3, name: "Enterprise", desc: "Medical Networks", price: "Custom", share: 17, features: ["Unlimited Patients", "Dedicated Manager"], buttonText: "Quote Builder", color: "bg-[#F8FAFC]", textColor: "text-[#1A1A2E]" },
];

const ACTIVE_SUBSCRIPTIONS = [
  { id: 1, name: "Skyline Vascular Group", clinicId: "CC-2891", plan: "PRO PLAN", method: "Visa •••• 4242", date: "Oct 12, 2023", amount: "$199.00", initials: "SV", initialsBg: "bg-[#2B5FC1]" },
  { id: 2, name: "Beacon Pediatrics", clinicId: "CC-3342", plan: "BASIC", method: "Mastercard •••• 8888", date: "Oct 05, 2023", amount: "$49.00", initials: "BP", initialsBg: "bg-[#6366F1]" },
  { id: 3, name: "Oakwood Medical Center", clinicId: "CC-1012", plan: "ENTERPRISE", method: "Bank Transfer", date: "Oct 28, 2023", amount: "Custom Billing", initials: "OM", initialsBg: "bg-[#92400E]" },
];

const PAYMENT_STATS = [
  { label: "Gross Collections", value: "$428,940", icon: <CreditCard size={20} />, badge: "+12.5%", badgeBg: "bg-[#D1FAE5]", badgeText: "text-[#10B981]", iconBg: "bg-[#EEF6FF]", iconColor: "text-[#2B5FC1]" },
  { label: "Average Transaction", value: "$185.20", icon: <Users size={20} />, badge: "+8.2%", badgeBg: "bg-[#D1FAE5]", badgeText: "text-[#10B981]", iconBg: "bg-[#EEF6FF]", iconColor: "text-[#2B5FC1]" },
  { label: "Active Subscriptions", value: "1,248", icon: <Users size={20} />, badge: "+6.2%", badgeBg: "bg-[#D1FAE5]", badgeText: "text-[#10B981]", iconBg: "bg-[#EEF6FF]", iconColor: "text-[#2B5FC1]" },
];

const OUTSTANDING_INVOICES = { label: "Outstanding Invoices", value: "$12,405" };

const RECENT_TRANSACTIONS = [
  { id: 1, name: "Metro Community Clinic", method: "Visa •••• 4212", date: "Oct 14, 2023, 14:22", amount: "$250.00", status: "SUCCESS", initials: "EH", initialsBg: "bg-[#EEF6FF]", initialsColor: "text-[#2B5FC1]" },
  { id: 2, name: "Northwest Medical Group", method: "Bank Transfer", date: "Oct 13, 2023, 11:05", amount: "$1,420.00", status: "PENDING", initials: "NM", initialsBg: "bg-[#EEF6FF]", initialsColor: "text-[#2B5FC1]" },
  { id: 3, name: "City Heart Clinic", method: "MasterCard •••• 9901", date: "Oct 12, 2023, 09:15", amount: "$85.00", status: "FAILED", initials: "CH", initialsBg: "bg-[#FEE2E2]", initialsColor: "text-[#EF4444]" },
  { id: 4, name: "Apex Medical Center", method: "Visa •••• 1122", date: "Oct 11, 2023, 16:40", amount: "$499.00", status: "SUCCESS", initials: "AM", initialsBg: "bg-[#EEF6FF]", initialsColor: "text-[#2B5FC1]" },
  { id: 5, name: "Blue Sky Pediatrics", method: "Bank Transfer", date: "Oct 10, 2023, 10:30", amount: "$199.00", status: "PENDING", initials: "BS", initialsBg: "bg-[#FFF4E5]", initialsColor: "text-[#A85E00]" },
  { id: 6, name: "Evergreen Senior Care", method: "Visa •••• 5566", date: "Oct 09, 2023, 13:15", amount: "$1,200.00", status: "SUCCESS", initials: "ES", initialsBg: "bg-[#EEF6FF]", initialsColor: "text-[#2B5FC1]" },
  { id: 7, name: "Global Access Health", method: "MasterCard •••• 3344", date: "Oct 08, 2023, 15:20", amount: "$350.00", status: "SUCCESS", initials: "GA", initialsBg: "bg-[#EEF6FF]", initialsColor: "text-[#2B5FC1]" },
  { id: 8, name: "Mayo Clinic - Rochester", method: "Bank Transfer", date: "Oct 07, 2023, 08:45", amount: "$2,500.00", status: "SUCCESS", initials: "MC", initialsBg: "bg-[#EEF6FF]", initialsColor: "text-[#2B5FC1]" },
];

const REPORT_STATS = [
  { icon: <ClipboardCheck size={20} />, iconBg: 'bg-[#EEF6FF]', iconColor: 'text-[#2B5FC1]', value: '14,820', label: 'Total Visits', badge: '+12.5%', badgeBg: 'bg-[#D1FAE5]', badgeText: 'text-[#10B981]' },
  { icon: <Shield size={20} />, iconBg: 'bg-[#EEF6FF]', iconColor: 'text-[#2B5FC1]', value: '98.2%', label: 'Compliance Rate', badge: 'Optimal', badgeBg: 'bg-[#EEF6FF]', badgeText: 'text-[#2B5FC1]' },
  { icon: <Building2 size={20} />, iconBg: 'bg-[#FFF4E5]', iconColor: 'text-[#A85E00]', value: '42', label: 'Active Organizations', badge: '-2.1%', badgeBg: 'bg-[#FEE2E2]', badgeText: 'text-[#EF4444]' },
  { icon: <AlertTriangle size={20} />, iconBg: 'bg-[#FEE2E2]', iconColor: 'text-[#EF4444]', value: '18', label: 'Pending Organizations', badge: 'Critical', badgeBg: 'bg-[#FEE2E2]', badgeText: 'text-[#EF4444]' },
];

const TOP_ORGS_DETAILED = [
  { id: 1, name: "Mayo Clinic - Rochester", compliance: "99.8%", visits: "4.2k", progress: 95 },
  { id: 2, name: "Cleveland Clinic - Main", compliance: "98.4%", visits: "3.8k", progress: 88 },
  { id: 3, name: "Johns Hopkins Medicine", compliance: "97.5%", visits: "3.5k", progress: 82 },
  { id: 4, name: "UCLA Health - Westwood", compliance: "96.5%", visits: "2.9k", progress: 78 },
];

const VISIT_STATUS_DATA = [
  { name: 'Completed', value: 65, color: '#2B5FC1' },
  { name: 'Pending', value: 20, color: '#94A3B8' },
  { name: 'Cancelled', value: 15, color: '#E2E8F0' },
];

const SYSTEM_ACTIVITY_LOGS = [
  { id: 1, type: "Compliance Update", user: "Dr. James Wilson", org: "Mayo Clinic", time: "Oct 24, 2023 • 14:22", status: "PROCESSED", statusBg: "bg-[#EEF6FF]", statusText: "text-[#2B5FC1]", icon: <Shield size={16} />, iconBg: "bg-[#EEF6FF]", iconColor: "text-[#2B5FC1]" },
  { id: 2, type: "Security Alert", user: "System Admin", org: "Global Access", time: "Oct 24, 2023 • 12:05", status: "CRITICAL", statusBg: "bg-[#FEE2E2]", statusText: "text-[#EF4444]", icon: <Lock size={16} />, iconBg: "bg-[#FEE2E2]", iconColor: "text-[#EF4444]" },
  { id: 3, type: "New Enrollment", user: "Sarah Jenkins", org: "Johns Hopkins", time: "Oct 24, 2023 • 09:15", status: "SUCCESS", statusBg: "bg-[#EEF6FF]", statusText: "text-[#2B5FC1]", icon: <UserPlus size={16} />, iconBg: "bg-[#EEF6FF]", iconColor: "text-[#2B5FC1]" },
  { id: 4, type: "Billing Batch", user: "Accounts Payable", org: "Cleveland Clinic", time: "Oct 23, 2023 • 17:40", status: "COMPLETED", statusBg: "bg-[#F1F5F9]", statusText: "text-[#64748B]", icon: <CreditCard size={16} />, iconBg: "bg-[#F1F5F9]", iconColor: "text-[#64748B]" },
];

const COLLECTION_STATUS_DATA = [
  { name: 'Paid', value: 82, color: '#2B5FC1' },
  { name: 'Pending', value: 14, color: '#6366F1' },
  { name: 'Failed', value: 4, color: '#EF4444' },
];

const HEATMAP_DATA = [
  { day: 'MONDAY', value: 40 },
  { day: 'TUESDAY', value: 25 },
  { day: 'WEDNESDAY', value: 75 },
  { day: 'THURSDAY', value: 30 },
  { day: 'FRIDAY', value: 55 },
  { day: 'SATURDAY', value: 95 },
  { day: 'SUNDAY', value: 20 },
];

const ANALYTICS_DATA = [
  { name: 'Jan', visits: 4000, revenue: 2400 },
  { name: 'Feb', visits: 3000, revenue: 1398 },
  { name: 'Mar', visits: 2000, revenue: 9800 },
  { name: 'Apr', visits: 2780, revenue: 3908 },
  { name: 'May', visits: 1890, revenue: 4800 },
  { name: 'Jun', visits: 2390, revenue: 3800 },
  { name: 'Jul', visits: 3490, revenue: 4300 },
];

const TOP_ORGS = [
  { name: 'Mercy Hospital', visits: '1,240', growth: '+12.5%' },
  { name: 'St. Jude Medical', visits: '980', growth: '+8.2%' },
  { name: 'City Care Center', visits: '850', growth: '+15.1%' },
  { name: 'Green Valley Clinic', visits: '720', growth: '+5.4%' },
];

const REGIONAL_DATA = [
  { name: 'North', value: 400 },
  { name: 'South', value: 300 },
  { name: 'East', value: 200 },
  { name: 'West', value: 278 },
];

const SUPPORT_TICKETS = [
  { id: '8291', subject: 'Login Issue', category: 'Technical', requester: 'John Doe', org: 'Mercy Hospital', priority: 'HIGH', status: 'OPEN' },
  { id: '8292', subject: 'Billing Inquiry', category: 'Billing', requester: 'Jane Smith', org: 'St. Jude Medical', priority: 'MEDIUM', status: 'PENDING' },
  { id: '8293', subject: 'New Feature Request', category: 'Feature', requester: 'Mike Ross', org: 'City Care Center', priority: 'LOW', status: 'CLOSED' },
  { id: '8294', subject: 'Data Export Error', category: 'Technical', requester: 'Sarah Connor', org: 'Green Valley Clinic', priority: 'HIGH', status: 'OPEN' },
];

const SUPPORT_STATS_DATA = [
  { label: "Active Tickets", value: "24", icon: <Ticket size={20} />, badge: "+4%", badgeBg: "bg-[#EEF6FF]", badgeText: "text-[#2B5FC1]", iconBg: "bg-[#EEF6FF]", iconColor: "text-[#2B5FC1]" },
  { label: "New Leads", value: "12", icon: <UserPlus size={20} />, badge: "New", badgeBg: "bg-[#FFF4E5]", badgeText: "text-[#F59E0B]", iconBg: "bg-[#FFF4E5]", iconColor: "text-[#F59E0B]" },
  { label: "Avg. Response Time", value: "1.5h", icon: <Clock size={20} />, badge: "Stable", badgeBg: "bg-[#F1F5F9]", badgeText: "text-[#6B7280]", iconBg: "bg-[#F1F5F9]", iconColor: "text-[#6B7280]" },
  { label: "Resolved Today", value: "18", icon: <CheckCircle2 size={20} />, badge: "Good", badgeBg: "bg-[#D1FAE5]", badgeText: "text-[#10B981]", iconBg: "bg-[#ECFDF5]", iconColor: "text-[#10B981]" },
];

const REPORTS_STATS = REPORT_STATS;
const RECENT_INQUIRIES = SUPPORT_TICKETS;

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [activeTab, setActiveTab] = useState('Organizations');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [showCareGiverModal, setShowCareGiverModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showViewRequestModal, setShowViewRequestModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showDetailPage, setShowDetailPage] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<any>(null);
  const [cmsTab, setCmsTab] = useState('Website Content');
  const [plans, setPlans] = useState(PLANS_DATA);
  const [cmsSubTab, setCmsSubTab] = useState('Home');
  const [activeContentTab, setActiveContentTab] = useState('Website Content');
  const [activeWebsiteSubTab, setActiveWebsiteSubTab] = useState('Home');

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId !== null) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [openMenuId]);

  return (
    <div className="min-h-screen flex bg-[#F4F6F9]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Righteous&display=swap');
          
          .custom-dot {
            filter: drop-shadow(0 0 4px rgba(43, 95, 193, 0.4));
          }
        `}
      </style>

      {/* --- SIDEBAR --- */}
      <aside className={`fixed left-0 top-0 ${isSidebarCollapsed ? 'w-20' : 'w-56'} h-screen bg-[#1E3A7B] z-50 flex flex-col overflow-hidden transition-all duration-300`}>
        {/* Top Logo Block */}
        <div className={`px-5 py-6 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-white text-3xl tracking-tight" style={{ fontFamily: "'Righteous', cursive" }}>
                Docucare
              </span>
              <span className="text-[#A8BFFF] text-[10px] tracking-[0.2em] uppercase mt-0.5 font-semibold">
                Admin Console
              </span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`text-white/60 hover:text-white transition-colors ${isSidebarCollapsed ? '' : 'ml-2'}`}
          >
            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="mt-4 space-y-1 px-3">
          <NavItem 
            icon={<LayoutGrid size={18} />} 
            label={isSidebarCollapsed ? "" : "Dashboard"} 
            active={activePage === 'Dashboard'} 
            onClick={() => setActivePage('Dashboard')}
          />
          <NavItem 
            icon={<Users size={18} />} 
            label={isSidebarCollapsed ? "" : "User Management"} 
            active={activePage === 'User Management'} 
            onClick={() => setActivePage('User Management')}
          />
          <NavItem 
            icon={<SquarePlay size={18} />} 
            label={isSidebarCollapsed ? "" : "Subscription Management"} 
            active={activePage === 'Subscription Management'}
            onClick={() => setActivePage('Subscription Management')}
          />
          <NavItem 
            icon={<Banknote size={18} />} 
            label={isSidebarCollapsed ? "" : "Payment Processing"} 
            active={activePage === 'Payment Processing'}
            onClick={() => setActivePage('Payment Processing')}
          />
          <NavItem 
            icon={<BarChart3 size={18} />} 
            label={isSidebarCollapsed ? "" : "Reports & Analytics"} 
            active={activePage === 'Reports & Analytics'}
            onClick={() => setActivePage('Reports & Analytics')}
          />
          <NavItem 
            icon={<MessageSquare size={18} />} 
            label={isSidebarCollapsed ? "" : "Support"} 
            active={activePage === 'Support'}
            onClick={() => setActivePage('Support')}
          />
          <NavItem 
            icon={<SlidersHorizontal size={18} />} 
            label={isSidebarCollapsed ? "" : "Content Management"} 
            active={activePage === 'Content Management'}
            onClick={() => setActivePage('Content Management')}
          />
          <NavItem 
            icon={<Settings size={18} />} 
            label={isSidebarCollapsed ? "" : "Settings"} 
            active={activePage === 'Settings'}
            onClick={() => setActivePage('Settings')}
          />
        </nav>

        {/* Bottom Profile */}
        <div className="mt-auto px-5 py-6">
          <div 
            onClick={() => setActivePage('Settings')}
            className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} cursor-pointer hover:opacity-80 transition-opacity`}
          >
            <div className="bg-[#2B5FC1]/20 p-2 rounded-lg">
              <Users className="text-white" size={18} />
            </div>
            {!isSidebarCollapsed && (
              <span className="text-white text-[13px] font-medium">Admin Profile</span>
            )}
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className={`${isSidebarCollapsed ? 'ml-20' : 'ml-56'} flex-1 min-h-screen transition-all duration-300`}>
        {/* Top Navbar */}
        <header className="h-20 px-8 flex items-center justify-between">
          <div className="w-[480px] bg-[#E5E7EB] rounded-full px-6 py-3 flex items-center gap-3">
            <Search className="text-[#4A5568]" size={20} />
            <input
              type="text"
              placeholder="Search clinics, subscriptions, or plans..."
              className="text-[15px] bg-transparent outline-none w-full text-[#1A1A2E] placeholder:text-[#718096]"
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Bell 
                onClick={() => setActivePage('Notifications')}
                className="text-[#4A5568] cursor-pointer hover:text-[#2B5FC1] transition-colors" 
                size={24} 
              />
              <HelpCircle className="text-[#4A5568] cursor-pointer hover:text-[#2B5FC1] transition-colors" size={24} />
            </div>
            <div className="w-px h-10 bg-[#CBD5E0]" />
            <div 
              onClick={() => setActivePage('Settings')}
              className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="text-right">
                <div className="text-[15px] font-bold text-[#1A1A2E]">Dr. Sarah Vance</div>
                <div className="text-[12px] text-[#718096] font-normal">System Administrator</div>
              </div>
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/sarah/100/100" 
                  alt="Profile" 
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          {showDetailPage && selectedDetailItem ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => setShowDetailPage(false)}
                  className="p-2 hover:bg-[#F1F5F9] rounded-full transition-all text-[#64748B]"
                >
                  <ChevronLeft size={24} />
                </button>
                <div>
                  <h1 className="text-[28px] font-bold text-[#1A1A2E] tracking-tight">
                    {selectedDetailItem.name} Details
                  </h1>
                  <p className="text-sm text-[#6B7280] mt-1">Minimal overview of the {activeTab === 'Organizations' ? 'organization' : 'caregiver'}.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E5E7EB]">
                    <h2 className="text-[18px] font-bold text-[#1A1A2E] mb-6">General Information</h2>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1">Name</div>
                        <div className="text-[15px] font-bold text-[#1A1A2E]">{selectedDetailItem.name}</div>
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1">Status</div>
                        <span className={`rounded-full px-4 py-1.5 text-[10px] font-bold tracking-wider ${selectedDetailItem.status === 'ACTIVE' ? 'bg-[#EEF6FF] text-[#2B5FC1]' : 'bg-[#F1F5F9] text-[#64748B]'}`}>
                          {selectedDetailItem.status}
                        </span>
                      </div>
                      {activeTab === 'Organizations' ? (
                        <>
                          <div>
                            <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1">Active Team</div>
                            <div className="text-[15px] font-bold text-[#1A1A2E]">{selectedDetailItem.activeTeam} Members</div>
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1">Region</div>
                            <div className="text-[15px] font-bold text-[#1A1A2E]">{selectedDetailItem.region}</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1">Organization</div>
                            <div className="text-[15px] font-bold text-[#1A1A2E]">{selectedDetailItem.org}</div>
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1">Visits</div>
                            <div className="text-[15px] font-bold text-[#1A1A2E]">{selectedDetailItem.visits}</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E5E7EB]">
                    <h2 className="text-[18px] font-bold text-[#1A1A2E] mb-6">Quick Actions</h2>
                    <div className="space-y-3">
                      <button className="w-full bg-[#2B5FC1] text-white rounded-lg py-3 text-[13px] font-bold hover:bg-[#1E3A7B] transition-all">
                        Edit Profile
                      </button>
                      <button className="w-full bg-white border border-[#E5E7EB] text-[#1A1A2E] rounded-lg py-3 text-[13px] font-bold hover:bg-[#F8FAFC] transition-all">
                        Download Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {activePage === 'Dashboard' && (
            <>
              {/* Header Row */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-[28px] font-bold text-[#1A1A2E] tracking-tight">Good morning, Admin 👋</h1>
                  <p className="text-sm text-[#6B7280] mt-1">
                    System status is operational. Here's what's happening across your clinics today.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-white border border-[#E5E7EB] rounded-full px-5 py-2.5 text-sm flex items-center gap-2 text-[#1A1A2E] font-semibold shadow-sm hover:bg-gray-50 transition-all">
                    <ListFilter size={16} className="text-[#1A1A2E]" />
                    <span>State: All</span>
                    <ChevronDown size={14} className="text-[#1A1A2E]" />
                  </button>
                  <button className="bg-white border border-[#E5E7EB] rounded-full px-5 py-2.5 text-sm flex items-center gap-2 text-[#1A1A2E] font-semibold shadow-sm hover:bg-gray-50 transition-all">
                    <Calendar size={16} className="text-[#1A1A2E]" />
                    <span>Last 30 Days</span>
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={<Building2 size={20} />}
                  iconBg="bg-[#EEF6FF]"
                  iconColor="text-[#2B5FC1]"
                  value="48"
                  label="Total Organizations"
                  badge="+12%"
                  badgeBg="bg-[#EEF6FF]"
                  badgeText="text-[#2B5FC1]"
                />
                <StatCard
                  icon={<BriefcaseMedical size={20} />}
                  iconBg="bg-[#FFF4E5]"
                  iconColor="text-[#A85E00]"
                  value="312"
                  label="Active Caregivers"
                  badge="+4%"
                  badgeBg="bg-[#FFF4E5]"
                  badgeText="text-[#F59E0B]"
                />
                <StatCard
                  icon={<Banknote size={20} />}
                  iconBg="bg-[#2B5FC1]"
                  iconColor="text-white"
                  value="$24,500"
                  label="Monthly Revenue"
                  badge="+22%"
                  badgeBg="bg-[#EEF6FF]"
                  badgeText="text-[#2B5FC1]"
                />
                <StatCard
                  icon={<ClipboardList size={20} />}
                  iconBg="bg-[#FEE2E2]"
                  iconColor="text-[#EF4444]"
                  value="7"
                  label="Pending Approvals"
                  badge="Urgent"
                  badgeBg="bg-[#FEE2E2]"
                  badgeText="text-[#EF4444]"
                />
              </div>

              {/* Middle Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Overview */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-[18px] font-bold text-[#1A1A2E]">Revenue Overview</h2>
                      <p className="text-[13px] text-[#6B7280] mt-1">Financial performance over the last 6 months</p>
                    </div>
                    <div className="flex bg-[#F4F6F9] p-1 rounded-full">
                      <button className="text-[12px] font-bold rounded-full px-4 py-1.5 bg-white text-[#2B5FC1] shadow-sm">Monthly</button>
                      <button className="text-[12px] font-bold rounded-full px-4 py-1.5 text-[#6B7280] hover:bg-white/50 transition-colors">Quarterly</button>
                    </div>
                  </div>
                  <div className="h-[240px] mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2B5FC1" stopOpacity={0.08} />
                            <stop offset="95%" stopColor="#2B5FC1" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="0" stroke="#F4F6F9" vertical={false} />
                        <XAxis
                          dataKey="month"
                          tick={{ fill: '#1A1A2E', fontSize: 11, fontWeight: 600 }}
                          axisLine={false}
                          tickLine={false}
                          dy={15}
                        />
                        <YAxis hide />
                        <Tooltip
                          cursor={{ stroke: '#2B5FC1', strokeWidth: 1, strokeDasharray: '4 4' }}
                          contentStyle={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '12px',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            border: 'none',
                            padding: '10px'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#2B5FC1"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                          dot={(props) => {
                            const { cx, cy, payload } = props;
                            if (payload.month === 'FEB' || payload.month === 'MAY') {
                              return (
                                <circle 
                                  cx={cx} 
                                  cy={cy} 
                                  r={3.5} 
                                  fill="#2B5FC1" 
                                  stroke="white" 
                                  strokeWidth={2} 
                                  className="custom-dot"
                                />
                              );
                            }
                            return null;
                          }}
                          activeDot={{ r: 5, fill: '#2B5FC1', stroke: 'white', strokeWidth: 2 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-[#F2F4F8] rounded-xl shadow-sm p-6">
                  <h2 className="text-[18px] font-bold text-[#1A1A2E]">Recent Activity</h2>
                  <div className="relative mt-6 space-y-8">
                    {/* Vertical Line */}
                    <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-[#E5E7EB]" />
                    
                    {RECENT_ACTIVITY.map((item) => (
                      <div key={item.id} className="relative flex items-start gap-4 z-10">
                        <div className={`${item.bg} ${item.color} w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-[14px] font-bold text-[#1A1A2E] leading-tight">{item.title}</div>
                          <div className="text-[12px] text-[#6B7280] mt-1 leading-relaxed">{item.desc}</div>
                          <div className={`text-[10px] font-bold mt-1.5 uppercase tracking-wider ${item.timeColor}`}>{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom - Latest Organizations Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-[18px] font-bold text-[#1A1A2E]">Latest Organizations</h2>
                    <p className="text-[13px] text-[#6B7280] mt-1">Review and manage recent partner onboarding</p>
                  </div>
                  <button className="bg-[#2B5FC1] text-white rounded-full px-6 py-2.5 hover:bg-[#1E3A7B] text-[13px] font-bold transition-all shadow-md">
                    View All Organizations
                  </button>
                </div>

                <div className="w-full overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-[#F8FAFC]">
                      <tr>
                        <th className="px-6 py-3 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Organization Name</th>
                        <th className="px-6 py-3 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Plan</th>
                        <th className="px-6 py-3 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Staff Count</th>
                        <th className="px-6 py-3 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Status</th>
                        <th className="px-6 py-3 text-right text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {ORGANIZATIONS.map((org) => (
                        <tr key={org.id} className="hover:bg-[#F8FAFC] transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`${org.iconBg} ${org.iconColor} w-10 h-10 rounded-lg flex items-center justify-center shadow-sm`}>
                                {org.icon}
                              </div>
                              <div>
                                <div className="text-[14px] font-bold text-[#1A1A2E]">{org.name}</div>
                                <div className="text-[11px] text-[#6B7280] font-medium">{org.joined}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[13px] font-medium text-[#1A1A2E]">{org.plan}</td>
                          <td className="px-6 py-4 text-[13px] font-medium text-[#1A1A2E]">{org.staff}</td>
                          <td className="px-6 py-4">
                            <span className={`rounded-full px-3 py-1 text-[11px] font-bold shadow-sm ${org.statusBg} ${org.statusText}`}>
                              {org.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-[#6B7280] hover:text-[#2B5FC1] p-2 rounded-lg hover:bg-[#EEF6FF] transition-all">
                              <MoreVertical size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activePage === 'User Management' && (
            <div className="space-y-6">
              {/* User Management Header */}
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-[28px] font-bold text-[#1A1A2E] tracking-tight">User Management</h1>
                  <p className="text-sm text-[#6B7280] mt-1">
                    Manage and audit healthcare organization access and caregiver accounts.
                  </p>
                </div>
                <div className="flex bg-[#E2E8F0] p-1 rounded-full">
                  <button 
                    onClick={() => setActiveTab('Organizations')}
                    className={`text-[13px] font-bold rounded-full px-6 py-2 transition-all ${activeTab === 'Organizations' ? 'bg-white text-[#2B5FC1] shadow-sm' : 'text-[#6B7280] hover:text-[#1A1A2E]'}`}
                  >
                    Organizations
                  </button>
                  <button 
                    onClick={() => setActiveTab('Clinical Team')}
                    className={`text-[13px] font-bold rounded-full px-6 py-2 transition-all ${activeTab === 'Clinical Team' ? 'bg-white text-[#2B5FC1] shadow-sm' : 'text-[#6B7280] hover:text-[#1A1A2E]'}`}
                  >
                    Clinical Team
                  </button>
                </div>
              </div>

              {/* Table Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#E5E7EB]">
                {/* Filters Row */}
                <div className="p-6 flex flex-wrap gap-4 items-center justify-between border-b border-[#F1F5F9]">
                  <div className="flex gap-3">
                    <button className="bg-[#F4F6F9] border border-[#E5E7EB] rounded-lg px-4 py-2 text-[13px] flex items-center gap-2 text-[#1A1A2E] font-bold">
                      <ListFilter size={16} />
                      <span>Status: Active</span>
                      <ChevronDown size={14} />
                    </button>
                    <button className="bg-[#F4F6F9] border border-[#E5E7EB] rounded-lg px-4 py-2 text-[13px] flex items-center gap-2 text-[#1A1A2E] font-bold">
                      <Calendar size={16} />
                      <span>Last 30 Days</span>
                    </button>
                  </div>
                  <div className="flex gap-3 flex-1 max-w-md">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                      <input 
                        type="text" 
                        placeholder="Search" 
                        className="w-full bg-[#F4F6F9] border border-[#E5E7EB] rounded-lg pl-10 pr-4 py-2 text-[13px] outline-none focus:border-[#2B5FC1] transition-colors"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        if (activeTab === 'Organizations') setShowOrgModal(true);
                        else setShowCareGiverModal(true);
                      }}
                      className="bg-[#1E3A7B] text-white rounded-lg px-5 py-2 text-[13px] font-bold flex items-center gap-2 hover:bg-[#152958] transition-all"
                    >
                      <Plus size={16} />
                      <span>{activeTab === 'Organizations' ? 'Add Organization' : 'Add Care Giver'}</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="w-full overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-[#F8FAFC]">
                      <tr>
                        {activeTab === 'Organizations' ? (
                          <>
                            <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Organization Name</th>
                            <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Clinical Team</th>
                            <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Monthly Volume</th>
                            <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Region</th>
                            <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-right text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Actions</th>
                          </>
                        ) : (
                          <>
                            <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Care Giver Name</th>
                            <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Organization Name</th>
                            <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Visits</th>
                            <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">State</th>
                            <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Region</th>
                            <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-right text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Actions</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {(activeTab === 'Organizations' ? ORGANIZATIONS_LIST : CLINICAL_TEAM_LIST).map((item) => (
                        <tr key={item.id} className="hover:bg-[#F8FAFC] transition-colors relative">
                          {activeTab === 'Organizations' ? (
                            <>
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                  <div className={`${item.iconBg} ${item.iconColor} w-10 h-10 rounded-lg flex items-center justify-center shadow-sm`}>
                                    {item.icon}
                                  </div>
                                  <div>
                                    <div className="text-[14px] font-bold text-[#1A1A2E]">{item.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="text-[14px] font-bold text-[#1A1A2E]">{item.activeTeam} active</div>
                                <div className="text-[11px] text-[#6B7280] font-medium">{item.pendingTeam} pending</div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="text-[14px] font-bold text-[#1A1A2E]">{item.visits}</div>
                                <div className="text-[11px] text-[#6B7280] font-medium">visits</div>
                              </td>
                              <td className="px-6 py-5 text-[14px] font-medium text-[#1A1A2E]">{item.region}</td>
                              <td className="px-6 py-5">
                                <span className={`rounded-full px-4 py-1.5 text-[10px] font-bold tracking-wider ${item.status === 'ACTIVE' ? 'bg-[#EEF6FF] text-[#2B5FC1]' : 'bg-[#F1F5F9] text-[#64748B]'}`}>
                                  {item.status}
                                </span>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="px-6 py-5 text-[14px] font-bold text-[#1A1A2E]">{item.name}</td>
                              <td className="px-6 py-5">
                                <div className="text-[14px] font-bold text-[#1A1A2E]">{item.org}</div>
                                <div className="text-[11px] text-[#6B7280] font-medium">{item.org}</div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="text-[14px] font-bold text-[#1A1A2E]">{item.visits}</div>
                                <div className="text-[11px] text-[#6B7280] font-medium">visits</div>
                              </td>
                              <td className="px-6 py-5 text-[14px] font-medium text-[#1A1A2E]">{item.state}</td>
                              <td className="px-6 py-5 text-[14px] font-medium text-[#1A1A2E]">{item.region}</td>
                              <td className="px-6 py-5">
                                <span className={`rounded-full px-4 py-1.5 text-[10px] font-bold tracking-wider ${item.status === 'ACTIVE' ? 'bg-[#EEF6FF] text-[#2B5FC1]' : 'bg-[#F1F5F9] text-[#64748B]'}`}>
                                  {item.status}
                                </span>
                              </td>
                            </>
                          )}
                          <td className="px-6 py-5 text-right relative">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(openMenuId === item.id ? null : item.id);
                              }}
                              className="text-[#6B7280] hover:text-[#2B5FC1] p-2 rounded-lg hover:bg-[#EEF6FF] transition-all"
                            >
                              <MoreVertical size={18} />
                            </button>
                            {/* Action Menu */}
                            {openMenuId === item.id && (
                              <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-white shadow-xl rounded-xl border border-[#E5E7EB] py-2 w-40 z-20">
                                <button 
                                  onClick={() => {
                                    setSelectedDetailItem(item);
                                    setShowDetailPage(true);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full px-4 py-2 flex items-center gap-3 text-[13px] font-bold text-[#1A1A2E] hover:bg-[#F8FAFC]"
                                >
                                  <Eye size={16} className="text-[#64748B]" />
                                  View Details
                                </button>
                                <button className="w-full px-4 py-2 flex items-center gap-3 text-[13px] font-bold text-[#EF4444] hover:bg-[#F8FAFC]">
                                  <Ban size={16} />
                                  Deactivate
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-6 flex justify-between items-center border-t border-[#F1F5F9]">
                  <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">
                    Page 1 of 8 • 84 Organizations Total
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[#6B7280] hover:text-[#2B5FC1]"><ChevronLeft size={18} /></button>
                    <button className="w-8 h-8 rounded-full bg-[#2B5FC1] text-white text-[13px] font-bold flex items-center justify-center">1</button>
                    <button className="w-8 h-8 rounded-full text-[#6B7280] text-[13px] font-bold flex items-center justify-center hover:bg-[#F1F5F9]">2</button>
                    <button className="w-8 h-8 rounded-full text-[#6B7280] text-[13px] font-bold flex items-center justify-center hover:bg-[#F1F5F9]">3</button>
                    <button className="p-2 text-[#6B7280] hover:text-[#2B5FC1]"><ChevronRight size={18} /></button>
                  </div>
                </div>
              </div>

              {/* Organization Growth Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E5E7EB]">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-[18px] font-bold text-[#1A1A2E]">{activeTab === 'Organizations' ? 'Organization Growth' : 'Clinical Team Growth'}</h2>
                    <p className="text-[13px] text-[#6B7280] mt-1">{activeTab === 'Organizations' ? 'Expansion trajectory across key healthcare markets' : 'Growth trends of clinical staff across organizations'}</p>
                  </div>
                  <button 
                    onClick={() => setActivePage('Reports & Analytics')}
                    className="text-[#2B5FC1] text-[12px] font-bold uppercase tracking-wider hover:underline"
                  >
                    View Full Report
                  </button>
                </div>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={GROWTH_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                      <defs>
                        <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2B5FC1" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#2B5FC1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="0" stroke="#F4F6F9" vertical={false} />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: '#1A1A2E', fontSize: 11, fontWeight: 600 }}
                        axisLine={false}
                        tickLine={false}
                        dy={15}
                      />
                      <YAxis hide />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#2B5FC1"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorGrowth)"
                        dot={{ r: 5, fill: 'white', stroke: '#2B5FC1', strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: '#2B5FC1', stroke: 'white', strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activePage === 'Subscription Management' && (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-[28px] font-bold text-[#1A1A2E] tracking-tight">Subscription Management</h1>
                  <p className="text-sm text-[#6B7280] mt-1">Oversee clinical revenue, plan distribution, and active patient allocations.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#F3F4F6] rounded-full px-4 py-2 flex items-center gap-2 border border-[#E5E7EB]">
                    <Clock size={14} className="text-[#6B7280]" />
                    <span className="text-[12px] font-bold text-[#4B5563]">v2.4.0 Draft</span>
                    <span className="text-[12px] text-[#9CA3AF]">Last updated 2 days ago by Alex K.</span>
                  </div>
                  <button className="bg-white border border-[#E5E7EB] rounded-full px-6 py-2.5 text-[13px] font-bold text-[#1A1A2E] shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2">
                    <Activity size={16} className="text-[#64748B]" />
                    Reset Changes
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {SUBSCRIPTION_STATS.map((stat, i) => (
                  <StatCard 
                    key={i} 
                    icon={stat.icon}
                    iconBg={stat.iconBg}
                    iconColor={stat.iconColor}
                    value={stat.value}
                    label={stat.label}
                    badge={stat.badge}
                    badgeBg={stat.badgeBg}
                    badgeText={stat.badgeText}
                  />
                ))}
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {plans.map((plan, i) => (
                  <div key={i} className={`rounded-2xl p-8 relative overflow-hidden shadow-sm border border-[#E5E7EB] ${plan.color}`}>
                    {plan.popular && (
                      <div className="absolute top-4 right-4 bg-[#EEF6FF] text-[#2B5FC1] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Most Popular
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <div>
                        <div className={`${plan.textColor} text-[18px] font-bold`}>{plan.name}</div>
                        <div className={`${plan.textColor} opacity-70 text-[13px] mt-1`}>{plan.desc}</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-baseline justify-end gap-1">
                          <input 
                            type="text" 
                            value={plan.price}
                            onChange={(e) => {
                              const newPlans = [...plans];
                              newPlans[i].price = e.target.value;
                              setPlans(newPlans);
                            }}
                            className={`${plan.textColor} text-[32px] font-bold bg-transparent border-none outline-none w-24 text-right focus:ring-1 focus:ring-white/20 rounded`}
                          />
                          {plan.price !== 'Custom' && <span className={`${plan.textColor} opacity-60 text-[14px]`}>/mo</span>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`${plan.textColor} text-[11px] font-bold uppercase tracking-wider opacity-70`}>Market Share</span>
                        <span className={`${plan.textColor} text-[11px] font-bold`}>{plan.share}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
                        <div className={`h-full ${plan.popular ? 'bg-white' : 'bg-[#2B5FC1]'} rounded-full`} style={{ width: `${plan.share}%` }} />
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 size={18} className={plan.textColor} />
                          <input 
                            type="text" 
                            value={feature}
                            onChange={(e) => {
                              const newPlans = [...plans];
                              newPlans[i].features[idx] = e.target.value;
                              setPlans(newPlans);
                            }}
                            className={`${plan.textColor} text-[14px] bg-transparent border-none outline-none flex-1 focus:ring-1 focus:ring-white/20 rounded`}
                          />
                        </div>
                      ))}
                    </div>

                    <button className={`mt-10 w-full py-3.5 rounded-xl text-[14px] font-bold transition-all ${plan.popular ? 'bg-white text-[#1E3A7B] hover:bg-gray-50' : 'bg-[#1E3A7B] text-white hover:bg-[#152958]'}`}>
                      {plan.buttonText}
                    </button>
                  </div>
                ))}
              </div>

              {/* Active Subscriptions Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#E5E7EB]">
                <div className="p-6 flex justify-between items-center border-b border-[#F1F5F9]">
                  <h2 className="text-[18px] font-bold text-[#1A1A2E]">Active Subscriptions</h2>
                  <div className="flex gap-3">
                    <button className="bg-[#F4F6F9] border border-[#E5E7EB] rounded-lg px-4 py-2 text-[13px] font-bold flex items-center gap-2 text-[#64748B]">
                      <ListFilter size={16} />
                      <span>Filter</span>
                    </button>
                    <button className="bg-[#F4F6F9] border border-[#E5E7EB] rounded-lg px-4 py-2 text-[13px] font-bold flex items-center gap-2 text-[#64748B]">
                      <Download size={16} />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-[#F8FAFC]">
                      <tr>
                        <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Clinic / Client</th>
                        <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Current Plan</th>
                        <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Payment Method</th>
                        <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Next Billing</th>
                        <th className="px-6 py-4 text-right text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {ACTIVE_SUBSCRIPTIONS.map((sub) => (
                        <tr key={sub.id} className="hover:bg-[#F8FAFC] transition-colors">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className={`${sub.initialsBg} text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-[14px]`}>
                                {sub.initials}
                              </div>
                              <div>
                                <div className="text-[14px] font-bold text-[#1A1A2E]">{sub.name}</div>
                                <div className="text-[11px] text-[#6B7280] font-medium">ID: {sub.clinicId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                              {sub.plan}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-[14px] text-[#1A1A2E]">
                              <CreditCard size={16} className="text-[#64748B]" />
                              <span>{sub.method}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="text-[14px] font-bold text-[#1A1A2E]">{sub.date}</div>
                            <div className="text-[11px] text-[#6B7280] font-medium">{sub.amount}</div>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button className="text-[#64748B] hover:text-[#1A1A2E]">
                              <MoreVertical size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activePage === 'Payment Processing' && (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-[28px] font-bold text-[#1A1A2E] tracking-tight">Payment Processing</h1>
                  <p className="text-sm text-[#6B7280] mt-1">Oversee clinical revenue, plan distribution, and active patient allocations.</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {PAYMENT_STATS.map((stat, i) => (
                  <StatCard 
                    key={i} 
                    icon={stat.icon}
                    iconBg={stat.iconBg}
                    iconColor={stat.iconColor}
                    value={stat.value}
                    label={stat.label}
                    badge={stat.badge}
                    badgeBg={stat.badgeBg}
                    badgeText={stat.badgeText}
                  />
                ))}
                <StatCard 
                  icon={<ClipboardList size={20} />}
                  iconBg="bg-[#F1F5F9]"
                  iconColor="text-[#64748B]"
                  value={OUTSTANDING_INVOICES.value}
                  label="Pending Subscriptions"
                  badge="Draft"
                  badgeBg="bg-[#F1F5F9]"
                  badgeText="text-[#64748B]"
                />
              </div>

              {/* Middle Row: Recent Transactions & Collection Status */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Transactions Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden border border-[#E5E7EB]">
                  <div className="p-6 flex justify-between items-center border-b border-[#F1F5F9]">
                    <h2 className="text-[18px] font-bold text-[#1A1A2E]">Recent Transactions</h2>
                  </div>
                  <div className="w-full overflow-x-auto max-h-[400px] overflow-y-auto">
                    <table className="w-full border-collapse">
                      <thead className="bg-[#F8FAFC]">
                        <tr>
                          <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Organization Name</th>
                          <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Method</th>
                          <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Date</th>
                          <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Amount</th>
                          <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1F5F9]">
                        {RECENT_TRANSACTIONS.map((tx) => (
                          <tr key={tx.id} className="hover:bg-[#F8FAFC] transition-colors">
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className={`${tx.initialsBg} ${tx.initialsColor} w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px]`}>
                                  {tx.initials}
                                </div>
                                <div className="text-[14px] font-bold text-[#1A1A2E] leading-tight">
                                  {tx.name}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-2 text-[13px] text-[#64748B]">
                                {tx.method.includes('Visa') ? <CreditCard size={16} /> : tx.method.includes('Bank') ? <Building2 size={16} /> : <CreditCard size={16} />}
                                <span>{tx.method}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="text-[13px] font-medium text-[#1A1A2E]">{tx.date.split(',')[0]}</div>
                              <div className="text-[11px] text-[#64748B]">{tx.date.split(',')[1]}</div>
                            </td>
                            <td className="px-6 py-5 text-[14px] font-bold text-[#1A1A2E]">{tx.amount}</td>
                            <td className="px-6 py-5">
                              <span className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-wider ${
                                tx.status === 'SUCCESS' ? 'bg-[#EEF6FF] text-[#2B5FC1]' : 
                                tx.status === 'PENDING' ? 'bg-[#FFF4E5] text-[#A85E00]' : 
                                'bg-[#FEE2E2] text-[#EF4444]'
                              }`}>
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Collection Status Donut */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#E5E7EB]">
                  <h2 className="text-[18px] font-bold text-[#1A1A2E]">Collection Status</h2>
                  <p className="text-[13px] text-[#64748B] mt-1">October billing cycle performance</p>
                  
                  <div className="h-[220px] mt-6 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={COLLECTION_STATUS_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          paddingAngle={0}
                          dataKey="value"
                          stroke="none"
                        >
                          {COLLECTION_STATUS_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <div className="text-[28px] font-bold text-[#1A1A2E]">82%</div>
                      <div className="text-[10px] text-[#64748B] font-bold uppercase tracking-widest">Success Rate</div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    {COLLECTION_STATUS_DATA.map((item, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-[14px] text-[#64748B] font-medium">{item.name}</span>
                        </div>
                        <span className="text-[14px] font-bold text-[#1A1A2E]">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* System Activity Heatmap */}
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#E5E7EB]">
                <h2 className="text-[18px] font-bold text-[#1A1A2E] mb-8">System Activity Heatmap</h2>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={HEATMAP_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="0" stroke="#F1F5F9" vertical={false} />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fill: '#64748B', fontSize: 10, fontWeight: 600 }} 
                        axisLine={false} 
                        tickLine={false} 
                        dy={15}
                      />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{ fill: '#F8FAFC' }}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="#1E3A7B" 
                        radius={[8, 8, 0, 0]} 
                        barSize={100}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          {activePage === 'Reports & Analytics' && (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-[28px] font-bold text-[#1A1A2E] tracking-tight">Reports & Analytics</h1>
                  <p className="text-sm text-[#6B7280] mt-1">Real-time clinical performance and compliance oversight</p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-white border border-[#E5E7EB] rounded-full px-5 py-2.5 text-sm flex items-center gap-2 text-[#1A1A2E] font-semibold shadow-sm hover:bg-gray-50 transition-all">
                    <Calendar size={16} />
                    <span>Last 30 Days</span>
                  </button>
                  <button className="bg-[#2B5FC1] text-white rounded-full px-6 py-2.5 text-sm font-bold shadow-md hover:bg-[#1E3A7B] transition-all flex items-center gap-2">
                    <Download size={18} />
                    Export Full Report
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {REPORT_STATS.map((stat, i) => (
                  <StatCard 
                    key={i} 
                    icon={stat.icon}
                    iconBg={stat.iconBg}
                    iconColor={stat.iconColor}
                    value={stat.value}
                    label={stat.label}
                    badge={stat.badge}
                    badgeBg={stat.badgeBg}
                    badgeText={stat.badgeText}
                  />
                ))}
              </div>

              {/* Middle Row: Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
                {/* Visit Status Breakdown */}
                <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E5E7EB] relative">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-[18px] font-bold text-[#1A1A2E]">Visit Status Breakdown</h2>
                    <button className="text-[#64748B] hover:text-[#1A1A2E]">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="relative w-[240px] h-[240px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={VISIT_STATUS_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {VISIT_STATUS_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[28px] font-bold text-[#1A1A2E]">8,412</span>
                        <span className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">Completed</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-6">
                      {VISIT_STATUS_DATA.map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="text-[14px] font-bold text-[#1A1A2E]">{item.name}</span>
                              <span className="text-[14px] font-bold text-[#1A1A2E]">{item.value}%</span>
                            </div>
                            <div className="text-[12px] text-[#64748B] font-medium">({item.value}%)</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Performing Organizations */}
                <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E5E7EB]">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-[18px] font-bold text-[#1A1A2E]">Top Performing Organizations</h2>
                    <button className="text-[#2B5FC1] text-[13px] font-bold hover:underline">View All</button>
                  </div>
                  <div className="space-y-8">
                    {TOP_ORGS_DETAILED.map((org) => (
                      <div key={org.id} className="space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#2B5FC1] font-bold text-[14px]">
                            {org.id}
                          </div>
                          <div className="flex-1">
                            <div className="text-[14px] font-bold text-[#1A1A2E]">{org.name}</div>
                            <div className="text-[11px] text-[#64748B] font-medium">
                              {org.compliance} Compliance • {org.visits} Visits
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                          <div className="h-full bg-[#2B5FC1] rounded-full" style={{ width: `${org.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* System Activity Logs Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#E5E7EB]">
                <div className="p-8 flex justify-between items-center border-b border-[#F1F5F9]">
                  <h2 className="text-[18px] font-bold text-[#1A1A2E]">System Activity Logs</h2>
                  <div className="flex items-center gap-3">
                    <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer">
                      <span className="text-[13px] font-bold text-[#1A1A2E]">All Activities</span>
                      <ChevronDown size={16} className="text-[#64748B]" />
                    </div>
                    <button className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-all text-[#64748B]">
                      <ListFilter size={20} />
                    </button>
                  </div>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-[#F8FAFC]">
                      <tr>
                        <th className="px-8 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Event Type</th>
                        <th className="px-8 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Entity / User</th>
                        <th className="px-8 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Organization</th>
                        <th className="px-8 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Timestamp</th>
                        <th className="px-8 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Status</th>
                        <th className="px-8 py-4 text-right text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {SYSTEM_ACTIVITY_LOGS.map((log) => (
                        <tr key={log.id} className="hover:bg-[#F8FAFC] transition-colors">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <div className={`${log.iconBg} ${log.iconColor} w-10 h-10 rounded-full flex items-center justify-center`}>
                                {log.icon}
                              </div>
                              <span className="text-[14px] font-bold text-[#1A1A2E]">{log.type}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B] font-bold text-[12px]">
                                {log.user.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="text-[14px] font-bold text-[#1A1A2E]">{log.user}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-[14px] font-medium text-[#64748B]">{log.org}</td>
                          <td className="px-8 py-5">
                            <div className="text-[14px] font-medium text-[#1A1A2E]">{log.time.split(' • ')[0]}</div>
                            <div className="text-[11px] text-[#64748B] font-medium"> • {log.time.split(' • ')[1]}</div>
                          </td>
                          <td className="px-8 py-5">
                            <span className={`rounded-full px-4 py-1.5 text-[10px] font-bold tracking-wider ${log.statusBg} ${log.statusText}`}>
                              {log.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            {/* Action placeholder */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-8 border-t border-[#F1F5F9] flex justify-between items-center bg-white">
                  <div className="text-[13px] text-[#64748B] font-medium">
                    SHOWING 4 OF 1,240 EVENTS
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#64748B]"><ChevronLeft size={18} /></button>
                    <button className="w-8 h-8 rounded-lg bg-[#2B5FC1] text-white text-[13px] font-bold">1</button>
                    <button className="w-8 h-8 rounded-lg hover:bg-[#F8FAFC] text-[#64748B] text-[13px] font-bold">2</button>
                    <button className="w-8 h-8 rounded-lg hover:bg-[#F8FAFC] text-[#64748B] text-[13px] font-bold">3</button>
                    <button className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#64748B]"><ChevronRight size={18} /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === 'Content Management' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 bg-[#E5E7EB] p-1 rounded-full w-fit mb-8">
                {['Website Content', 'Terms & Conditions'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setCmsTab(tab)}
                    className={`px-6 py-2 rounded-full text-[13px] font-bold transition-all ${
                      cmsTab === tab ? 'bg-white text-[#1A1A2E] shadow-sm' : 'text-[#64748B]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-[28px] font-bold text-[#1A1A2E] tracking-tight">Content Management</h1>
                  <div className="flex items-center gap-6 mt-2">
                    <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B] bg-[#E9EFF4] px-4 py-2 rounded-full">
                      <Clock size={14} />
                      <span>Last updated 2 days ago by <span className="text-[#1A1A2E] font-bold">Alex K.</span></span>
                    </div>
                    <span className="text-[14px] font-medium text-[#64748B]">{cmsTab === 'Website Content' ? 'v2.4.0 Draft' : 'v2.1.0 Draft'}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="bg-[#2B5FC1] text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-[#2B5FC1]/20 hover:bg-[#1E3A7B] transition-all">
                    Publish Changes
                  </button>
                  <button className="bg-[#E9EFF4] text-[#2B5FC1] px-8 py-2.5 rounded-full text-sm font-bold hover:bg-[#DDE5ED] transition-all">
                    Reset Changes
                  </button>
                </div>
              </div>

              {cmsTab === 'Website Content' ? (
                <>
                  <div className="flex items-center gap-2 bg-white p-1 rounded-full w-fit mb-8 shadow-sm border border-[#E5E7EB]">
                    {['Home', 'Features', 'Contact', 'Footer'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setCmsSubTab(tab)}
                        className={`px-8 py-2 rounded-full text-[13px] font-bold transition-all ${
                          cmsSubTab === tab ? 'bg-[#EEF6FF] text-[#2B5FC1]' : 'text-[#64748B]'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-6 pb-20">
                    {cmsSubTab === 'Home' && (
                      <>
                        {/* SECTION 1 */}
                        <CMSSection title="SECTION . 1">
                          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
                            <CMSImageUpload src="https://picsum.photos/seed/docudash1/800/600" />
                            <div className="space-y-6">
                              <CMSField label="HEADING" value="Revolutionize Your Home Care Management with Docucare" />
                              <CMSField label="BODY TEXT" value="A scalable, user-friendly platform designed for modern healthcare organizations to ensure excellence in patient outcomes." isTextarea />
                            </div>
                          </div>
                        </CMSSection>

                        {/* SECTION 2 */}
                        <CMSSection title="SECTION . 2">
                          <div className="space-y-8">
                            <div className="space-y-6">
                              <CMSField label="HEADING" value="Precision Engineering for Home Care" />
                              <CMSField label="BODY TEXT" value="Streamline every touchpoint of the care journey with our authoritative suite of tools." isTextarea />
                            </div>

                            <div className="border-t border-[#F1F5F9] pt-8">
                              <div className="text-[14px] font-bold text-[#2B5FC1] mb-6">2.1</div>
                              <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
                                <CMSImageUpload src="https://picsum.photos/seed/docudash2/800/600" />
                                <div className="space-y-6">
                                  <CMSField label="SUB-HEADING" value="Patient Management" />
                                  <CMSField label="BODY TEXT" value="Secure patient data with military-grade encryption. Our centralized vault ensures compliance while providing caregivers instant access to vital medical histories and care plans." isTextarea />
                                  <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">BULLET POINTS</label>
                                    <div className="space-y-2">
                                      {['HIPAA-Compliant Data Storage', 'Real-time Vitals Monitoring'].map((point, i) => (
                                        <div key={i} className="bg-[#F1F5F9] rounded-xl px-5 py-3 text-[14px] text-[#1A1A2E] font-medium">
                                          {point}
                                        </div>
                                      ))}
                                      <button className="text-[#2B5FC1] p-1 hover:bg-[#EEF6FF] rounded-lg transition-all">
                                        <Plus size={20} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-[#F1F5F9] pt-8">
                              <div className="text-[14px] font-bold text-[#2B5FC1] mb-6">2.2</div>
                              <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
                                <CMSImageUpload src="https://picsum.photos/seed/mancomputer/800/600" />
                                <div className="space-y-6">
                                  <CMSField label="SUB-HEADING" value="Visit Scheduling" />
                                  <CMSField label="BODY TEXT" value="Optimize caregiver routes and assignments with our intelligent scheduling engine. Reduce travel time and ensure the right specialist is matched with every patient." isTextarea />
                                  <CMSField label="QUOTE" value='"The automated routing alone saved our agency over 40 hours of admin work per week."' isTextarea />
                                </div>
                              </div>
                            </div>
                          </div>
                        </CMSSection>

                        {/* SECTION 3 */}
                        <CMSSection title="SECTION . 3">
                          <div className="space-y-8">
                            <div className="space-y-6">
                              <CMSField label="HEADING" value="Turn Data Into Actionable Insights" />
                              <CMSField label="BODY TEXT" value="Advanced analytics that track performance, compliance, and patient health trends across your entire organization." isTextarea />
                            </div>
                            <div className="space-y-8 pt-4">
                              <div className="space-y-6">
                                <CMSField label="SUB-HEADING" value="Compliance Tracking" />
                                <CMSField label="BODY TEXT" value="Automated audit trails for every caregiver visit and medication dispense." isTextarea />
                              </div>
                              <div className="space-y-6">
                                <CMSField label="SUB-HEADING" value="User Management" />
                                <CMSField label="BODY TEXT" value="Granular roles and permissions for nurses, admins, and family members." isTextarea />
                              </div>
                            </div>
                          </div>
                        </CMSSection>

                        {/* SECTION 4 */}
                        <CMSSection title="SECTION . 4">
                          <div className="space-y-8">
                            <CMSField label="HEADING" value="Trusted by Industry Leaders" />
                            <div className="space-y-12">
                              {[
                                { name: "Sarah Jenkins", review: "NurseLed has completely transformed how we manage our 200+ field staff. The interface is intuitive and the data integrity is unmatched." },
                                { name: "Sarah Jenkins", review: "The transition from our legacy system was seamless. Docucare's support team is as exceptional as their software." }
                              ].map((testimonial, i) => (
                                <div key={i} className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">
                                  <CMSImageUpload src={`https://picsum.photos/seed/face${i+10}/400/400`} />
                                  <div className="space-y-6">
                                    <CMSField label="CLIENT NAME" value={testimonial.name} />
                                    <CMSField label="REVIEW" value={testimonial.review} isTextarea />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CMSSection>

                        {/* SECTION 5 */}
                        <CMSSection title="SECTION . 5">
                          <CMSField label="HEADING" value="Ready to Improve Your Home Care Management?" />
                        </CMSSection>
                      </>
                    )}

                    {cmsSubTab === 'Footer' && (
                      <CMSSection title="FOOTER">
                        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
                          <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-[#1A1A2E] border border-[#E5E7EB] flex items-center justify-center">
                            <div className="flex flex-col items-center">
                              <span className="text-white text-4xl tracking-tight" style={{ fontFamily: "'Righteous', cursive" }}>
                                Docucare
                              </span>
                            </div>
                            <div className="absolute top-4 right-4 flex gap-2">
                              <button className="bg-white p-2 rounded-lg shadow-md hover:scale-105 transition-transform">
                                <Upload size={18} className="text-[#2B5FC1]" />
                              </button>
                              <button className="bg-[#EF4444] p-2 rounded-lg shadow-md hover:scale-105 transition-transform">
                                <Trash2 size={18} className="text-white" />
                              </button>
                            </div>
                          </div>
                          <div className="space-y-6">
                            <CMSField label="BODY TEXT" value="Building the future of patient-centric healthcare management." isTextarea />
                          </div>
                        </div>
                      </CMSSection>
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
                  <div className="px-6 py-3 border-b border-[#F1F5F9] flex items-center gap-6 bg-[#F8FAFC]">
                    <div className="flex items-center gap-4 text-[#64748B]">
                      <button className="hover:text-[#1A1A2E] transition-colors"><Bold size={18} /></button>
                      <button className="hover:text-[#1A1A2E] transition-colors"><Italic size={18} /></button>
                      <button className="hover:text-[#1A1A2E] transition-colors"><Underline size={18} /></button>
                    </div>
                    <div className="w-px h-6 bg-[#E2E8F0]" />
                    <div className="flex items-center gap-4 text-[#64748B]">
                      <button className="hover:text-[#1A1A2E] transition-colors"><List size={18} /></button>
                      <button className="hover:text-[#1A1A2E] transition-colors"><ListOrdered size={18} /></button>
                    </div>
                    <div className="w-px h-6 bg-[#E2E8F0]" />
                    <div className="flex items-center gap-4 text-[#64748B]">
                      <button className="hover:text-[#1A1A2E] transition-colors"><LinkIcon size={18} /></button>
                      <button className="hover:text-[#1A1A2E] transition-colors"><ImageIcon size={18} /></button>
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                      <div className="bg-[#E9EFF4] px-4 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-[#DDE5ED] transition-all">
                        <span className="text-[13px] font-bold text-[#1A1A2E]">Heading 2</span>
                        <ChevronDown size={14} className="text-[#64748B]" />
                      </div>
                      <button className="text-[#64748B] hover:text-[#1A1A2E] transition-colors"><Maximize2 size={18} /></button>
                    </div>
                  </div>
                  <div className="p-12 space-y-12 max-w-4xl mx-auto min-h-[600px]">
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h2 className="text-[#2B5FC1] text-[14px] font-extrabold tracking-widest uppercase">SECTION . 2</h2>
                        <div className="space-y-2">
                          <label className="text-[13px] font-extrabold text-[#4A5568] tracking-wider uppercase">HEADING</label>
                          <div className="bg-[#F1F5F9] rounded-xl px-6 py-4 text-[18px] font-bold text-[#1A1A2E] border border-transparent focus-within:border-[#2B5FC1]/20 transition-all">
                            Precision Engineering for Home Care
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[13px] font-extrabold text-[#4A5568] tracking-wider uppercase">BODY TEXT</label>
                        <div className="bg-[#F1F5F9] rounded-xl px-6 py-4 text-[15px] text-[#64748B] leading-relaxed border border-transparent focus-within:border-[#2B5FC1]/20 transition-all min-h-[120px]">
                          Streamline every touchpoint of the care journey with our authoritative suite of tools.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activePage === 'Settings' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-[28px] font-bold text-[#1A1A2E] tracking-tight">Settings</h1>
                <p className="text-sm text-[#6B7280] mt-1">Manage clinical protocols, administrative credentials, and security parameters.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
                {/* LEFT COLUMN */}
                <div className="space-y-8">
                  {/* Platform Settings */}
                  <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-[#EEF6FF] p-2.5 rounded-xl">
                        <Monitor size={20} className="text-[#2B5FC1]" />
                      </div>
                      <h2 className="text-[16px] font-bold text-[#1A1A2E]">Platform Settings</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">CLINIC INSTANCE NAME</label>
                        <input 
                          type="text" 
                          defaultValue="Docucare"
                          className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-[14px] text-[#1A1A2E] font-medium outline-none focus:ring-2 focus:ring-[#2B5FC1]/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">SYSTEM LANGUAGE</label>
                        <div className="relative">
                          <select className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-[14px] text-[#1A1A2E] font-medium outline-none appearance-none focus:ring-2 focus:ring-[#2B5FC1]/20 transition-all">
                            <option>English (US)</option>
                            <option>Spanish</option>
                            <option>French</option>
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <div className="text-[14px] font-bold text-[#1A1A2E]">Maintenance Mode</div>
                          <div className="text-[12px] text-[#64748B]">Disable public access during updates</div>
                        </div>
                        <button className="w-12 h-6 bg-[#E2E8F0] rounded-full relative transition-colors">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notification Preferences */}
                  <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-[#EEF6FF] p-2.5 rounded-xl">
                        <Bell size={20} className="text-[#2B5FC1]" />
                      </div>
                      <h2 className="text-[16px] font-bold text-[#1A1A2E]">Notification Preferences</h2>
                    </div>

                    <div className="space-y-6">
                      {[
                        { label: 'Critical System Alerts', desc: 'Immediate notification for server or clinical data issues.', checked: true },
                        { label: 'Subscription Renewals', desc: 'Weekly summaries of upcoming billing cycles.', checked: true },
                        { label: 'Marketing & Insights', desc: 'New feature updates and clinical optimization tips.', checked: false }
                      ].map((pref, i) => (
                        <div key={i} className="flex gap-4">
                          <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${pref.checked ? 'bg-[#2B5FC1] border-[#2B5FC1]' : 'border-[#CBD5E1]'}`}>
                            {pref.checked && <Check size={14} className="text-white" />}
                          </div>
                          <div>
                            <div className="text-[14px] font-bold text-[#1A1A2E]">{pref.label}</div>
                            <div className="text-[12px] text-[#64748B] leading-relaxed">{pref.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-8">
                  {/* Admin Profile */}
                  <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FFF4E5] p-2.5 rounded-xl">
                        <User size={20} className="text-[#A85E00]" />
                      </div>
                      <h2 className="text-[16px] font-bold text-[#1A1A2E]">Admin Profile</h2>
                    </div>

                    <div className="flex items-start gap-8">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#EEF6FF] flex items-center justify-center">
                          <img 
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-[#2B5FC1] p-1.5 rounded-lg border-2 border-white shadow-sm">
                          <ImageIcon size={14} className="text-white" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[14px] font-bold text-[#1A1A2E]">Profile Picture</div>
                        <div className="text-[12px] text-[#64748B]">JPG, GIF or PNG. Max size of 800K</div>
                        <div className="flex gap-4 mt-2">
                          <button className="text-[12px] font-bold text-[#2B5FC1] hover:underline">Upload New</button>
                          <button className="text-[12px] font-bold text-[#EF4444] hover:underline">Delete</button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">FULL NAME</label>
                        <input 
                          type="text" 
                          defaultValue="Alex Carter"
                          className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-[14px] text-[#1A1A2E] font-medium outline-none focus:ring-2 focus:ring-[#2B5FC1]/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">EMAIL ADDRESS</label>
                        <input 
                          type="email" 
                          defaultValue="alex.carter@clinicalcurator.com"
                          className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-[14px] text-[#1A1A2E] font-medium outline-none focus:ring-2 focus:ring-[#2B5FC1]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">PROFESSIONAL BIO</label>
                      <textarea 
                        defaultValue="Lead administrator with over 12 years of experience in clinical workflow management and health tech implementation."
                        className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-[14px] text-[#1A1A2E] font-medium outline-none focus:ring-2 focus:ring-[#2B5FC1]/20 transition-all min-h-[100px] resize-none"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button className="bg-[#2B5FC1] text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-[#2B5FC1]/20 hover:bg-[#1E3A7B] transition-all">
                        Update Profile
                      </button>
                    </div>
                  </div>

                  {/* Security & Privacy */}
                  <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#EEF2F7] p-2.5 rounded-xl">
                        <Shield size={20} className="text-[#1A1A2E]" />
                      </div>
                      <h2 className="text-[16px] font-bold text-[#1A1A2E]">Security & Privacy</h2>
                    </div>

                    <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#F1F5F9]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[14px] font-bold text-[#1A1A2E]">Two-Factor Authentication</div>
                        <span className="bg-[#2B5FC1] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>
                      </div>
                      <p className="text-[12px] text-[#64748B] leading-relaxed">
                        Adding an extra layer of security to your admin account protects sensitive patient records.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">CURRENT PASSWORD</label>
                        <input 
                          type="password" 
                          defaultValue="............"
                          className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-[14px] text-[#1A1A2E] font-medium outline-none focus:ring-2 focus:ring-[#2B5FC1]/20 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">NEW PASSWORD</label>
                          <input 
                            type="password" 
                            className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-[14px] text-[#1A1A2E] font-medium outline-none focus:ring-2 focus:ring-[#2B5FC1]/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">CONFIRM PASSWORD</label>
                          <input 
                            type="password" 
                            className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-[14px] text-[#1A1A2E] font-medium outline-none focus:ring-2 focus:ring-[#2B5FC1]/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="bg-[#EEF2F7] text-[#64748B] px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-[#E2E8F0] transition-all">
                        Change Password
                      </button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-[#FFF5F5] rounded-2xl border border-dashed border-[#FECACA] p-8 flex items-center justify-between">
                    <div className="flex gap-4">
                      <div className="mt-1">
                        <AlertTriangle size={20} className="text-[#EF4444]" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-[#1A1A2E]">Delete Administrator Account</div>
                        <p className="text-[12px] text-[#64748B] leading-relaxed max-w-md">
                          Once you delete your account, there is no going back. Please be certain of this action and ensure clinic hand-off is complete.
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#EF4444] text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-[#EF4444]/20 hover:bg-[#DC2626] transition-all">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === 'Support' && (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-[28px] font-bold text-[#1A1A2E] tracking-tight">Support & Help Desk</h1>
                  <p className="text-sm text-[#6B7280] mt-1">Manage inquiries, technical issues, and system feedback.</p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-white border border-[#E5E7EB] rounded-full px-5 py-2.5 text-sm flex items-center gap-2 text-[#1A1A2E] font-semibold shadow-sm hover:bg-gray-50 transition-all">
                    <ListFilter size={16} />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {SUPPORT_STATS_DATA.map((stat, i) => (
                  <StatCard 
                    key={i} 
                    icon={stat.icon}
                    iconBg={stat.iconBg}
                    iconColor={stat.iconColor}
                    value={stat.value}
                    label={stat.label}
                    badge={stat.badge}
                    badgeBg={stat.badgeBg}
                    badgeText={stat.badgeText}
                  />
                ))}
              </div>

              {/* Tickets Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#E5E7EB]">
                <div className="p-6 flex justify-between items-center border-b border-[#F1F5F9]">
                  <h2 className="text-[18px] font-bold text-[#1A1A2E]">Recent Support Tickets</h2>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                      <input type="text" placeholder="Search tickets" className="bg-[#F4F6F9] border border-[#E5E7EB] rounded-lg pl-10 pr-4 py-2 text-[13px] outline-none" />
                    </div>
                  </div>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full border-collapse table-fixed">
                    <thead className="bg-[#F8FAFC]">
                      <tr>
                        <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest w-1/5">Ticket ID</th>
                        <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest w-1/5">Subject</th>
                        <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest w-1/5">Requester</th>
                        <th className="px-6 py-4 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-widest w-1/5">Status</th>
                        <th className="px-6 py-4 text-right text-[11px] font-bold text-[#6B7280] uppercase tracking-widest w-1/5">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {SUPPORT_TICKETS.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-[#F8FAFC] transition-colors">
                          <td className="px-6 py-5 text-[14px] font-bold text-[#2B5FC1]">#{ticket.id}</td>
                          <td className="px-6 py-5">
                            <div className="text-[14px] font-bold text-[#1A1A2E]">{ticket.subject}</div>
                            <div className="text-[11px] text-[#6B7280] font-medium">{ticket.category}</div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="text-[14px] font-bold text-[#1A1A2E]">{ticket.requester}</div>
                            <div className="text-[11px] text-[#6B7280] font-medium">{ticket.org}</div>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-wider ${
                              ticket.status === 'OPEN' ? 'bg-[#EEF6FF] text-[#2B5FC1]' : 
                              ticket.status === 'PENDING' ? 'bg-[#FFF4E5] text-[#A85E00]' : 
                              'bg-[#F1F5F9] text-[#64748B]'
                            }`}>
                              {ticket.status}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right relative">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(openMenuId === ticket.id ? null : ticket.id);
                              }}
                              className="p-2 hover:bg-[#F1F5F9] rounded-full transition-all text-[#64748B]"
                            >
                              <MoreVertical size={18} />
                            </button>
                            <AnimatePresence>
                              {openMenuId === ticket.id && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  className="absolute right-6 top-14 w-32 bg-white rounded-xl shadow-xl border border-[#E5E7EB] z-10 overflow-hidden"
                                >
                                  <button 
                                    onClick={() => {
                                      setSelectedTicket(ticket);
                                      setShowViewRequestModal(true);
                                      setOpenMenuId(null);
                                    }}
                                    className="w-full px-4 py-2.5 text-left text-[13px] font-bold text-[#1A1A2E] hover:bg-[#F8FAFC] flex items-center gap-2"
                                  >
                                    <Eye size={14} />
                                    View
                                  </button>
                                  <button className="w-full px-4 py-2.5 text-left text-[13px] font-bold text-[#EF4444] hover:bg-[#F8FAFC] flex items-center gap-2">
                                    <Trash2 size={14} />
                                    Delete
                                  </button>
                                  <button className="w-full px-4 py-2.5 text-left text-[13px] font-bold text-[#64748B] hover:bg-[#F8FAFC] flex items-center gap-2">
                                    <Ban size={14} />
                                    Remove
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activePage === 'Notifications' && (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-[28px] font-bold text-[#1A1A2E] tracking-tight">Notifications</h1>
                  <p className="text-sm text-[#6B7280] mt-1">Stay updated with system alerts, user activities, and administrative tasks.</p>
                </div>
                <button className="text-[#2B5FC1] text-sm font-bold hover:underline">Mark all as read</button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
                <div className="divide-y divide-[#F1F5F9]">
                  {[
                    { id: 1, title: 'New Organization Registration', desc: 'Apex Medical Center has submitted a new registration request.', time: '2 mins ago', type: 'info', unread: true },
                    { id: 2, title: 'Subscription Renewal', desc: 'Blue Sky Pediatrics has successfully renewed their Professional plan.', time: '1 hour ago', type: 'success', unread: true },
                    { id: 3, title: 'System Maintenance', desc: 'Scheduled maintenance will occur on Sunday, Oct 22 at 2:00 AM UTC.', time: '5 hours ago', type: 'warning', unread: false },
                    { id: 4, title: 'Support Ticket Assigned', desc: 'A new high-priority ticket #8291 has been assigned to you.', time: 'Yesterday', type: 'info', unread: false },
                    { id: 5, title: 'Payment Failed', desc: 'Transaction for City Heart Clinic was declined by the bank.', time: '2 days ago', type: 'error', unread: false },
                  ].map((notif) => (
                    <div key={notif.id} className={`p-6 flex gap-4 hover:bg-[#F8FAFC] transition-colors cursor-pointer ${notif.unread ? 'bg-[#F0F7FF]/30' : ''}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        notif.type === 'info' ? 'bg-[#EEF6FF] text-[#2B5FC1]' :
                        notif.type === 'success' ? 'bg-[#ECFDF5] text-[#10B981]' :
                        notif.type === 'warning' ? 'bg-[#FFF4E5] text-[#F59E0B]' :
                        'bg-[#FEE2E2] text-[#EF4444]'
                      }`}>
                        {notif.type === 'info' && <Bell size={18} />}
                        {notif.type === 'success' && <Check size={18} />}
                        {notif.type === 'warning' && <AlertTriangle size={18} />}
                        {notif.type === 'error' && <X size={18} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className={`text-[15px] font-bold ${notif.unread ? 'text-[#1A1A2E]' : 'text-[#64748B]'}`}>{notif.title}</h3>
                          <span className="text-[11px] font-medium text-[#94A3B8]">{notif.time}</span>
                        </div>
                        <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">{notif.desc}</p>
                      </div>
                      {notif.unread && <div className="w-2 h-2 bg-[#2B5FC1] rounded-full mt-2" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  </main>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {showOrgModal && (
          <Modal 
            title="New Organization" 
            onClose={() => setShowOrgModal(false)}
            onAdd={() => setShowOrgModal(false)}
            buttonText="Add Organization"
          >
            <div className="space-y-4">
              <ModalInput label="ORGANIZATION NAME" placeholder="Enter organization name" />
              <ModalInput label="CLINICAL TEAM" placeholder="Enter clinical team name" />
              <ModalInput label="MONTHLY VOLUME" placeholder="Enter monthly volume" />
              <ModalSelect label="REGION" placeholder="Select a region" options={['North', 'South', 'East', 'West']} />
            </div>
          </Modal>
        )}

        {showCareGiverModal && (
          <Modal 
            title="New Care Giver" 
            onClose={() => setShowCareGiverModal(false)}
            onAdd={() => setShowCareGiverModal(false)}
            buttonText="Add Care Giver"
          >
            <div className="space-y-4">
              <ModalInput label="CARE GIVER NAME" placeholder="Enter care giver name" />
              <ModalInput label="ORGANIZATION NAME" placeholder="Enter organization name" />
              <ModalInput label="VISITS" placeholder="Enter visits" />
              <div className="grid grid-cols-2 gap-4">
                <ModalSelect label="STATE" placeholder="Select a state" options={['California', 'Texas', 'New York', 'Florida']} />
                <ModalSelect label="REGION" placeholder="Select a region" options={['North', 'South', 'East', 'West']} />
              </div>
            </div>
          </Modal>
        )}

        {showSupportModal && (
          <Modal 
            title="Create Support Ticket" 
            onClose={() => setShowSupportModal(false)}
            onAdd={() => setShowSupportModal(false)}
            buttonText="Create Ticket"
          >
            <div className="space-y-4">
              <ModalInput label="SUBJECT" placeholder="Enter ticket subject" />
              <ModalSelect label="CATEGORY" placeholder="Select category" options={['Technical', 'Billing', 'Feature Request', 'Other']} />
              <ModalSelect label="PRIORITY" placeholder="Select priority" options={['Low', 'Medium', 'High', 'Critical']} />
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">DESCRIPTION</label>
                <textarea 
                  placeholder="Describe the issue..."
                  className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-[14px] text-[#1A1A2E] placeholder:text-[#94A3B8] outline-none focus:ring-2 focus:ring-[#2B5FC1]/20 transition-all min-h-[100px]"
                />
              </div>
            </div>
          </Modal>
        )}

        {showViewRequestModal && selectedTicket && (
          <Modal 
            title="Query Details" 
            onClose={() => setShowViewRequestModal(false)}
            hideFooter
          >
            <div className="space-y-6">
              {/* User Profile */}
              <div className="bg-[#F8FAFC] rounded-2xl p-5 flex items-center gap-4 border border-[#E5E7EB]">
                <img 
                  src={`https://picsum.photos/seed/${selectedTicket.requester}/100/100`} 
                  alt="Requester" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-[16px] font-bold text-[#1A1A2E]">{selectedTicket.requester}</div>
                  <div className="text-[12px] text-[#64748B]">{selectedTicket.requester.toLowerCase().replace(' ', '')}@gmail.com</div>
                </div>
              </div>

              {/* Details Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase">DATE</div>
                  <div className="text-[13px] font-bold text-[#1A1A2E]">OCT 12, 10:30 AM</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase">TOPIC</div>
                  <div className="text-[13px] font-bold text-[#1A1A2E] uppercase">{selectedTicket.category} REQUEST</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase">STATUS</div>
                  <div>
                    <span className="bg-[#FFF4E5] text-[#F59E0B] text-[10px] font-bold px-2 py-0.5 rounded">New</span>
                  </div>
                </div>
              </div>

              {/* Query Section */}
              <div className="bg-[#F1F5F9] rounded-2xl p-6 space-y-3">
                <div className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">QUERY</div>
                <p className="text-[14px] text-[#1A1A2E] leading-relaxed italic">
                  "We are interested in the Pro plan but have questions about the patient migration process and HIPAA compliance during the transition. Could we schedule a walkthrough next Tuesday?"
                </p>
              </div>

              {/* Footer Buttons */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowViewRequestModal(false)}
                  className="flex-1 bg-[#2B5FC1] text-white py-3 rounded-xl text-[14px] font-bold shadow-lg shadow-[#2B5FC1]/20 hover:bg-[#1E3A7B] transition-all"
                >
                  Mark as resolved
                </button>
                <button 
                  onClick={() => setShowViewRequestModal(false)}
                  className="px-8 py-3 text-[14px] font-bold text-[#2B5FC1] hover:bg-[#F1F5F9] rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function NavItem({ icon, label, active = false, onClick = () => {} }: any) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`
        cursor-pointer transition-all duration-300 group
        ${active 
          ? 'bg-white text-[#1E3A7B] rounded-full px-4 py-2.5 flex items-center gap-3 text-[14px] font-medium shadow-lg' 
          : 'text-white/70 rounded-full px-4 py-2.5 flex items-center gap-3 text-[14px] font-medium hover:bg-white/10 hover:text-white'
        }
      `}
    >
      <div className={`${active ? 'text-[#1E3A7B]' : 'text-white'} transition-colors`}>
        {icon}
      </div>
      <span className="tracking-wide">{label}</span>
    </motion.div>
  );
}

function StatCard({ icon, iconBg, iconColor, value, label, badge, badgeBg, badgeText }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-sm p-5 relative overflow-hidden group transition-all hover:shadow-md"
    >
      <div className="flex justify-between items-start">
        <div className={`${iconBg} ${iconColor} rounded-xl p-2.5 w-fit shadow-sm`}>
          {icon}
        </div>
        <div className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-sm ${badgeBg} ${badgeText}`}>
          {badge}
        </div>
      </div>
      
      <div className="mt-4">
        <div className="text-[13px] font-medium text-[#6B7280]">{label}</div>
        <div className="text-[26px] font-bold text-[#1A1A2E] mt-1 tracking-tight">{value}</div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2B5FC1] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}

// --- CMS COMPONENTS ---

function CMSSection({ title, children }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden"
    >
      <div className="px-8 py-5 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]/50">
        <h3 className="text-[14px] font-extrabold text-[#2B5FC1] tracking-widest uppercase">{title}</h3>
        <button className="text-[#94A3B8] hover:text-[#1A1A2E] transition-colors">
          <ChevronDown size={18} />
        </button>
      </div>
      <div className="p-8">
        {children}
      </div>
    </motion.div>
  );
}

function CMSField({ label, value, isTextarea = false }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[13px] font-extrabold text-[#4A5568] tracking-wider uppercase">{label}</label>
      {isTextarea ? (
        <textarea 
          defaultValue={value}
          className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-[14px] text-[#1A1A2E] font-medium outline-none focus:ring-2 focus:ring-[#2B5FC1]/20 transition-all min-h-[100px] resize-none"
        />
      ) : (
        <input 
          type="text" 
          defaultValue={value}
          className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-[14px] text-[#1A1A2E] font-medium outline-none focus:ring-2 focus:ring-[#2B5FC1]/20 transition-all"
        />
      )}
    </div>
  );
}

function CMSImageUpload({ src }: any) {
  return (
    <div className="relative group aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-[#F1F5F9] border border-[#E5E7EB]">
      <img 
        src={src} 
        alt="CMS Preview" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 flex gap-2">
        <button className="bg-white p-2 rounded-lg shadow-md hover:scale-105 transition-transform">
          <Download size={18} className="text-[#2B5FC1]" />
        </button>
        <button className="bg-[#EF4444] p-2 rounded-lg shadow-md hover:scale-105 transition-transform">
          <Trash2 size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}

// --- MODAL COMPONENTS ---

function Modal({ title, children, onClose, onAdd, buttonText, hideFooter = false }: any) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#1A1A2E]/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[480px] overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[20px] font-bold text-[#1A1A2E]">{title}</h2>
            <button onClick={onClose} className="text-[#94A3B8] hover:text-[#1A1A2E] transition-colors">
              <X size={20} />
            </button>
          </div>

          {children}

          {!hideFooter && (
            <div className="mt-10 flex items-center justify-center gap-6">
              <button 
                onClick={onAdd}
                className="bg-[#1E3A7B] text-white rounded-lg px-8 py-3 text-[14px] font-bold hover:bg-[#152958] transition-all shadow-lg shadow-[#1E3A7B]/20"
              >
                {buttonText}
              </button>
              <button 
                onClick={onClose}
                className="text-[#2B5FC1] text-[14px] font-bold hover:underline"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ModalInput({ label, placeholder }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder}
        className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-[14px] text-[#1A1A2E] placeholder:text-[#94A3B8] outline-none focus:ring-2 focus:ring-[#2B5FC1]/20 transition-all"
      />
    </div>
  );
}

function ModalSelect({ label, placeholder, options }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-[#64748B] tracking-widest uppercase">{label}</label>
      <div className="relative">
        <select 
          className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-3.5 text-[14px] text-[#1A1A2E] appearance-none outline-none focus:ring-2 focus:ring-[#2B5FC1]/20 transition-all"
          defaultValue=""
        >
          <option value="" disabled>{placeholder}</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" size={16} />
      </div>
    </div>
  );
}
