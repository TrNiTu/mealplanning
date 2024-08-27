import { Tab, TabList, Tabs } from "@chakra-ui/react";

const ScreenTabs = ({ setSelectedTabIndex, screenTabNames }) => {
	return (
		<Tabs
			defaultIndex={1}
			size="sm"
			variant="solid-rounded"
			colorScheme="green"
			onChange={(index) => setSelectedTabIndex(index)}
		>
			<TabList>
				{screenTabNames.map((name, i) => (
					<Tab
						_selected={{ bg: "#b09d92", color: "#3c3632" }}
						key={i}
						mx="3rem"
						mb="3"
					>
						{name}
					</Tab>
				))}
			</TabList>
		</Tabs>
	);
};

export default ScreenTabs;
