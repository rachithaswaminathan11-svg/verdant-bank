import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Factory,
  Zap,
  FileText,
  Leaf,
  MessageSquare,
  BarChart3,
  Settings,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
} from "lucide-react";

const branchSeed = [
  {
    name: "Chennai Head Office",
    location: "Chennai",
    employees: 124,
    energy: 1840,
    status: "Good",
  },
  {
    name: "Coimbatore Branch",
    location: "Coimbatore",
    employees: 86,
    energy: 1320,
    status: "Good",
  },
  {
    name: "Madurai Branch",
    location: "Madurai",
    employees: 64,
    energy: 980,
    status: "Average",
  },
  {
    name: "Trichy Branch",
    location: "Trichy",
    employees: 52,
    energy: 760,
    status: "Good",
  },
];

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/branches", label: "Branches", icon: Building2 },
  { path: "/emissions", label: "Emissions", icon: Factory },
  { path: "/energy", label: "Energy", icon: Zap },
  { path: "/paper-usage", label: "Paper Usage", icon: FileText },
  { path: "/green-rooms", label: "Green Rooms", icon: Leaf },
  { path: "/sms-alerts", label: "SMS Alerts", icon: MessageSquare },
  { path: "/esg-reports", label: "ESG Reports", icon: BarChart3 },
  { path: "/admin", label: "Admin", icon: Settings },
];

function Layout({ children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">
            <Leaf size={24} />
          </div>
          <div>
            <h2>Verdant Bank</h2>
            <span>Green Banking</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-avatar">RS</div>
          <div>
            <strong>Admin User</strong>
            <span>ESG Administrator</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Green Banking Dashboard</h1>
            <p>Environmental sustainability monitoring system</p>
          </div>

          <div className="topbar-status">
            <span className="status-dot"></span>
            System Online
          </div>
        </header>

        <section className="page-content">{children}</section>
      </main>
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = "up",
}) {
  return (
    <Card className="stat-card">
      <div className="stat-top">
        <div>
          <p className="stat-title">{title}</p>
          <h2>{value}</h2>
        </div>

        <div className="stat-icon">
          <Icon size={23} />
        </div>
      </div>

      <div className={`stat-trend ${trendType}`}>
        {trendType === "up" ? (
          <TrendingUp size={15} />
        ) : (
          <TrendingDown size={15} />
        )}
        <span>{trend}</span>
        <small>{subtitle}</small>
      </div>
    </Card>
  );
}

function Dashboard() {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    async function loadBranches() {
      const { data, error } = await supabase
        .from("branches")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error loading branches:", error);
        return;
      }

      setBranches(data || []);
    }

    loadBranches();
  }, []);
  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Overview</h2>
          <p>Monitor your organisation's sustainability performance.</p>
        </div>

        <button className="primary-button">Generate Report</button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Branches"
          value="24"
          subtitle="this month"
          trend="8.4%"
          icon={Building2}
        />

        <StatCard
          title="Energy Usage"
          value="12,840 kWh"
          subtitle="vs last month"
          trend="6.2%"
          icon={Zap}
          trendType="down"
        />

        <StatCard
          title="Carbon Emissions"
          value="4.28 tCO₂e"
          subtitle="vs last month"
          trend="11.5%"
          icon={Factory}
          trendType="down"
        />

        <StatCard
          title="Paper Saved"
          value="1,284 kg"
          subtitle="this year"
          trend="18.7%"
          icon={FileText}
        />
      </div>

      <div className="dashboard-grid">
        <Card>
          <div className="card-header">
            <div>
              <h3>Branch Sustainability</h3>
              <p>Latest branch-level environmental performance</p>
            </div>
            <Activity size={20} />
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Branch</th>
                  <th>Employees</th>
                  <th>Energy</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {branches.map((branch) => (
                  <tr key={branch.name}>
                    <td>
                      <strong>{branch.name}</strong>
                      <span className="table-sub">{branch.location}</span>
                    </td>
                    <td>{branch.employees}</td>
                    <td>{branch.energy} kWh</td>
                    <td>
                      <span
                        className={`badge ${
                          branch.status === "Good" ? "good" : "average"
                        }`}
                      >
                        {branch.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="card-header">
            <div>
              <h3>ESG Score</h3>
              <p>Current sustainability rating</p>
            </div>
            <Leaf size={20} />
          </div>

          <div className="score-circle">
            <strong>82</strong>
            <span>/ 100</span>
          </div>

          <div className="score-label">Excellent</div>

          <div className="progress-list">
            <div>
              <span>Environmental</span>
              <strong>88%</strong>
            </div>
            <div className="progress">
              <span style={{ width: "88%" }}></span>
            </div>

            <div>
              <span>Social</span>
              <strong>79%</strong>
            </div>
            <div className="progress">
              <span style={{ width: "79%" }}></span>
            </div>

            <div>
              <span>Governance</span>
              <strong>81%</strong>
            </div>
            <div className="progress">
              <span style={{ width: "81%" }}></span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="energy-card">
        <div className="card-header">
          <div>
            <h3>Energy Consumption</h3>
            <p>Last 30 days · target 7,000 kWh/day</p>
          </div>
          <Zap size={20} />
        </div>

        <div className="energy-chart">
          {[42, 55, 48, 65, 58, 72, 61, 68, 52, 74, 64, 70].map(
            (height, index) => (
              <div className="bar-group" key={index}>
                <div
                  className="energy-bar"
                  style={{ height: `${height}%` }}
                ></div>
                <span>Day {index + 1}</span>
              </div>
            )
          )}
        </div>
      </Card>
    </div>
  );
}

function Branches() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Branches</h2>
          <p>Manage and monitor all bank branches.</p>
        </div>
        <button className="primary-button">Add Branch</button>
      </div>

      <div className="branch-grid">
        {branches.map((branch) => (
          <Card key={branch.name}>
            <div className="branch-icon">
              <Building2 size={24} />
            </div>

            <h3>{branch.name}</h3>
            <p>{branch.location}</p>

            <div className="branch-details">
              <div>
                <span>Employees</span>
                <strong>{branch.employees}</strong>
              </div>
              <div>
                <span>Energy</span>
                <strong>{branch.energy} kWh</strong>
              </div>
            </div>

            <span
              className={`badge ${
                branch.status === "Good" ? "good" : "average"
              }`}
            >
              {branch.status}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Emissions() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Carbon Emissions</h2>
          <p>Track and reduce greenhouse gas emissions.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total CO₂e"
          value="4.28 t"
          subtitle="vs previous month"
          trend="11.5%"
          icon={Factory}
          trendType="down"
        />

        <StatCard
          title="Scope 1"
          value="1.12 t"
          subtitle="direct emissions"
          trend="7.8%"
          icon={Factory}
          trendType="down"
        />

        <StatCard
          title="Scope 2"
          value="2.46 t"
          subtitle="electricity"
          trend="13.4%"
          icon={Zap}
          trendType="down"
        />

        <StatCard
          title="Scope 3"
          value="0.70 t"
          subtitle="indirect emissions"
          trend="4.1%"
          icon={Activity}
          trendType="down"
        />
      </div>

      <Card>
        <div className="card-header">
          <div>
            <h3>Emission Reduction Progress</h3>
            <p>Annual target: reduce emissions by 25%</p>
          </div>
        </div>

        <div className="large-progress">
          <span style={{ width: "68%" }}></span>
        </div>

        <div className="progress-info">
          <strong>68%</strong>
          <span>of target achieved</span>
        </div>
      </Card>
    </div>
  );
}

function Energy() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Energy Management</h2>
          <p>Monitor electricity consumption across branches.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Today's Usage"
          value="6,842 kWh"
          subtitle="target 7,000 kWh"
          trend="2.3%"
          icon={Zap}
          trendType="down"
        />

        <StatCard
          title="Monthly Usage"
          value="12.84 MWh"
          subtitle="vs last month"
          trend="6.2%"
          icon={Zap}
          trendType="down"
        />

        <StatCard
          title="Renewable Energy"
          value="34%"
          subtitle="of total consumption"
          trend="9.8%"
          icon={Leaf}
        />

        <StatCard
          title="Energy Efficiency"
          value="87%"
          subtitle="current score"
          trend="5.4%"
          icon={TrendingUp}
        />
      </div>

      <Card>
        <div className="card-header">
          <div>
            <h3>Daily Energy Usage</h3>
            <p>Last 12 monitoring periods</p>
          </div>
        </div>

        <div className="energy-chart large">
          {[48, 60, 52, 70, 58, 76, 64, 72, 55, 80, 66, 74].map(
            (height, index) => (
              <div className="bar-group" key={index}>
                <div
                  className="energy-bar"
                  style={{ height: `${height}%` }}
                ></div>
                <span>{index + 1}</span>
              </div>
            )
          )}
        </div>
      </Card>
    </div>
  );
}

function Placeholder({ title, description, icon: Icon }) {
  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <Card className="placeholder-card">
        <div className="placeholder-icon">
          <Icon size={34} />
        </div>
        <h3>{title} Module</h3>
        <p>
          This module is ready for backend integration and live data
          management.
        </p>
        <button className="primary-button">Configure Module</button>
      </Card>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      <Route
        path="/branches"
        element={
          <Layout>
            <Branches />
          </Layout>
        }
      />

      <Route
        path="/emissions"
        element={
          <Layout>
            <Emissions />
          </Layout>
        }
      />

      <Route
        path="/energy"
        element={
          <Layout>
            <Energy />
          </Layout>
        }
      />

      <Route
        path="/paper-usage"
        element={
          <Layout>
            <Placeholder
              title="Paper Usage"
              description="Track paper consumption and digitalisation progress."
              icon={FileText}
            />
          </Layout>
        }
      />

      <Route
        path="/green-rooms"
        element={
          <Layout>
            <Placeholder
              title="Green Rooms"
              description="Monitor green office and branch initiatives."
              icon={Leaf}
            />
          </Layout>
        }
      />

      <Route
        path="/sms-alerts"
        element={
          <Layout>
            <Placeholder
              title="SMS Alerts"
              description="Manage sustainability alerts and notifications."
              icon={MessageSquare}
            />
          </Layout>
        }
      />

      <Route
        path="/esg-reports"
        element={
          <Layout>
            <Placeholder
              title="ESG Reports"
              description="View and generate environmental sustainability reports."
              icon={BarChart3}
            />
          </Layout>
        }
      />

      <Route
        path="/admin"
        element={
          <Layout>
            <Placeholder
              title="Administration"
              description="Manage users, settings and system configuration."
              icon={Users}
            />
          </Layout>
        }
      />

      <Route
        path="*"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
