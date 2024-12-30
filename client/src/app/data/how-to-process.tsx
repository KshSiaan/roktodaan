import Link from "next/link";

export const processData = [
  {
    img: "",
    title: "How to find a donor",
    description: (
      <p>
        First, go to the{" "}
        <Link href="/find-donors" className="text-blue-500 underline">
          Find Donors
        </Link>{" "}
        page. And do the following:
        <br />
        <br />- Select a blood group for the patient.
        <br />- Select the district where the donor will donate the blood.
        <br />- Pick a date in which the donor will be eligible to donate blood.
        <br />- Select &quot;Eligible&quot;, or if you want both eligible and
        ineligible donors, select &quot;All&quot;.
        <br />- Click/Tap &quot;Find Donor&quot;.
        <br />- Select a reliable donor and click/tap &quot;Request
        Donation&quot;.
        <br />
        <br />
        <span className="text-sm font-semibold">
          ⚠️ Warning: Please verify the donor’s information and eligibility
          carefully. Avoid sharing sensitive or unnecessary personal information
          during the process.
        </span>
      </p>
    ),
  },
  {
    img: "", // Optional image field
    title: "Help Those in Need: Donate Blood and Make a Difference",
    description: (
      <p>
        First, visit the{" "}
        <Link href="/donate" className="text-blue-500 underline">
          Donate Blood
        </Link>{" "}
        page and follow these steps:
        <br />
        <br />
        - Select the blood group for the patient.
        <br />
        - Choose the district where the donor will donate blood.
        <br />
        - Pick the condition of the patient you can donate blood to.
        <br />
        - Click/Tap &quot;Find Donor&quot; to see available donors.
        <br />
        - Review the list and select a reliable donor, then click/tap
        &quot;Request Donation&quot;.
        <br />
        <br />
        <span className="text-sm font-semibold">
          ⚠️ Warning: Always verify the donor’s eligibility and credentials
          before proceeding. Never share sensitive or personal information
          unnecessarily.
        </span>
      </p>
    ),
  },
  {
    img: "", // Optional image field
    title: "Request Blood Donation from the Community",
    description: (
      <p>
        To request a blood donation, simply go to the{" "}
        <Link href="/request" className="text-blue-500 underline">
          Request Blood
        </Link>{" "}
        page and fill out the request form:
        <br />
        <br />
        1. Enter the required patient details, including blood group and
        district.
        <br />
        2. Specify the date when the blood is needed.
        <br />
        3. Choose the priority level (e.g., &quot;Urgent&quot; to
        &quot;Informal&quot;).
        <br />
        4. Provide a valid contact number for the donor to reach out.
        <br />
        5. Click/Tap &quot;Submit Request&quot; to notify the community.
        <br />
        <br />
        <span className="text-sm font-semibold text-red-600">
          ⚠️ Warning: Ensure all information entered is accurate and complete.
          Avoid sharing sensitive or unnecessary personal information.
        </span>
      </p>
    ),
  },
  {
    img: "",
    title: "Sharing Blood Donation Requests Made Simple",
    description: (
      <p>
        To share a blood donation request with others, go to the{" "}
        <Link href="/donate" className="text-blue-500 underline">
          Donate Blood
        </Link>{" "}
        page and follow these steps:
        <br />
        <br />
        1. Browse through the list of donation request cards.
        <br />
        2. Locate the specific request you want to share.
        <br />
        3. Click/Tap the &quot;Share&quot; button on the card.
        <br />
        4. Choose your preferred platform or method for sharing (e.g., social
        media, messaging apps, etc.).
        <br />
        <br />
        <span className="text-sm font-semibold">
          ⚠️ Tip: Sharing donation requests can help save lives. Make sure to
          highlight the urgency or details to encourage others to act.
        </span>
      </p>
    ),
  },
];
