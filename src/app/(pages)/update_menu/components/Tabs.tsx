interface TabsProps {
  tabs: { id: string; title: string }[]
  activeTab: string
  setActiveTab: (tabId: string) => void
}

export default function Tabs({ activeTab, tabs, setActiveTab }: TabsProps) {
  return (
    <ul className="flex md:flex-row flex-col space-y-4 md:space-y-0 space-x-4 overflow-hidden">
      {tabs.map((tab) => (
        <li
          key={tab.id}
          className={`w-[6rem] text-start md:text-center text-sm py-3 pl-5 md:px-5 shadow-md rounded-tl-2xl rounded-bl-2xl md:rounded-bl-none md:rounded-tr-2xl cursor-pointer ${
            activeTab === tab.id
              ? 'text-white font-bold bg-orange-ufcat'
              : 'text-gray-600 font-semibold bg-gray-200'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.title.slice(0, 3)}
        </li>
      ))}
    </ul>
  )
}
