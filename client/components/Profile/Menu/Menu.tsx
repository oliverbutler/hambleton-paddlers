import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Menu = ({ active }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const user = currentUser.user;

  function isActive(string) {
    if (string == active) {
      return " is-active";
    } else {
      return "";
    }
  }

  return (
    <div className="menu">
      <p className="menu-label">Profile</p>
      <ul className="menu-list">
        <li>
          <Link href="/profile">
            <a className={isActive("dashboard")}>Dashboard</a>
          </Link>
        </li>
      </ul>
      <p className="menu-label">Members</p>
      <ul className="menu-list">
        {user.members &&
          user.members.map((member, index) => (
            <Link
              href={`/profile/members/${member.id}`}
              key={`member-${index}`}
            >
              <li>
                <a className={isActive(member.id)}>
                  {member.given_name} {member.family_name}
                </a>
              </li>
            </Link>
          ))}
      </ul>

      {/* <p className="menu-label">Events</p>
      <ul className="menu-list">
        <li>
          <a>Upcoming</a>
        </li>
        <li>
          <a>Attended</a>
        </li>
      </ul> */}

      <p className="menu-label">Membership</p>
      <ul className="menu-list">
        <li>
          <Link href="/profile/renewal">
            <a className={isActive("renewal")}>Renewal</a>
          </Link>
        </li>
        <li>
          <a>Payments</a>
        </li>
      </ul>

      <p className="menu-label">Settings</p>
      <ul className="menu-list">
        <li>
          <a>Emails</a>
        </li>
        <li>
          <a>Notifications</a>
        </li>
        <li>
          <a>Appearance</a>
        </li>
        <li>
          <Link href="/profile/security">
            <a className={isActive("security")}>Account Security</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
