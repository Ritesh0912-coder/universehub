"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

export default function NewsFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (search) {
            params.set("search", search);
        } else {
            params.delete("search");
        }
        router.push(`/news?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12 flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    placeholder="Search transmission logs..."
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
                Scan
            </Button>
        </form>
    );
}
