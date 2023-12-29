import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import GradeSelect from "./grade-select"

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

const CourseTable = () => {
    return (
        <Table>
            <TableCaption className="-mt-1 py-2 bg-slate-200/40">Your academic performance</TableCaption>
            <TableHeader>
                <TableRow className="w-full">
                    <TableHead className="w-[20%]">Code</TableHead>
                    <TableHead colSpan={2}>Course</TableHead>
                    <TableHead className="text-center w-[30%]">Grade</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell colSpan={2}>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right"><GradeSelect/></TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3} className="text-[#666]">Semester's GPA</TableCell>
                    <TableCell className="text-right font-bold">3.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default CourseTable