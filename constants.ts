import {
	BarChart4,
	Building2,
	Folder,
	Map as MapIcon,
	PiggyBank,
	ShoppingCart,
	Target,
	TrendingUp,
} from "lucide-react";

const year = new Date().getFullYear().toString();

export const destacados = [
	{
		title: "¿Quién gasta?",
		description:
			"Explora la distribución del gasto público entre las diferentes jurisdicciones del gobierno, como ministerios y organismos estatales.",
		link: `/quien-gasta?year=${year}`,
		icon: Building2,
	},
	{
		title: "¿A qué se destina el gasto?",
		description:
			"Analiza el presupuesto según las finalidades y funciones del Estado, revelando las prioridades en áreas como educación, salud, seguridad y más.",
		link: `/a-que-se-destina-el-gasto?year=${year}`,
		icon: Target,
	},
	{
		title: "¿En qué se gasta?",
		description:
			"Descubre cómo se distribuye el gasto por objeto, incluyendo salarios, bienes y servicios, inversiones y otros rubros específicos.",
		link: `/en-que-se-gasta?year=${year}`,
		icon: ShoppingCart,
	},
	{
		title: "¿Dónde se gasta?",
		description:
			"Visualiza la distribución geográfica del gasto público en Argentina, identificando las asignaciones por provincia y región.",
		link: `/donde-se-gasta?year=${year}`,
		icon: MapIcon,
	},
	{
		title: "¿De dónde vienen los recursos?",
		description:
			"Examina las fuentes de ingresos del Estado, incluyendo impuestos, contribuciones y otros recursos que financian el gasto público.",
		link: `/de-donde-vienen-los-recursos?year=${year}`,
		icon: PiggyBank,
	},
	{
		title: "¿Cuánto ingresa y cuánto se gasta?",
		description:
			"Compara los ingresos y gastos del Estado en relación al PIB, ofreciendo una perspectiva sobre el balance fiscal y la economía nacional.",
		link: "/cuanto-ingresa-y-cuanto-se-gasta",
		icon: BarChart4,
	},
	{
		title: "¿Para qué se gasta?",
		description:
			"Profundiza en los programas y proyectos específicos del gobierno, permitiendo un análisis detallado de las iniciativas estatales.",
		link: `/para-que-se-gasta?year=${year}`,
		icon: Folder,
	},
	{
		title: "¿Cuánto se lleva gastado del presupuesto?",
		description:
			"Monitorea la ejecución presupuestaria en tiempo real, comparando los gastos realizados con el presupuesto aprobado.",
		link: `/cuanto-se-lleva-gastado-del-presupuesto?year=${year}`,
		icon: TrendingUp,
	},
];
