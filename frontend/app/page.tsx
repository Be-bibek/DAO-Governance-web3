'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useWalletStore } from '@/store/walletStore';
import { ExternalLink, PlusCircle, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { publicKey, connect } = useWalletStore();

  // Mock data for UI layout, will be replaced with Soroban data
  const [proposals] = useState([
    {
      id: 1,
      title: 'Fund DAO Marketing Campaign Q4',
      description: 'Allocate 5000 XLM for Twitter and Discord marketing bounties.',
      amount: '5000 XLM',
      yesVotes: 120,
      noVotes: 40,
      status: 'Active', // Active, Passed, Failed, Executed
      endTime: Date.now() + 86400000, // 1 day from now
    },
    {
      id: 2,
      title: 'Upgrade Treasury Security',
      description: 'Hire security firm to audit the new Treasury smart contract.',
      amount: '10000 XLM',
      yesVotes: 450,
      noVotes: 10,
      status: 'Executed',
      endTime: Date.now() - 86400000,
    }
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Governance Proposals</h1>
          <p className="text-gray-400 mt-1">Vote on active initiatives to shape the future of Nexus DAO.</p>
        </div>
        <Link href="/create">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Proposal
          </Button>
        </Link>
      </div>

      {/* Grid of proposals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {proposals.map((proposal) => {
          const totalVotes = proposal.yesVotes + proposal.noVotes;
          const yesPercentage = totalVotes === 0 ? 0 : (proposal.yesVotes / totalVotes) * 100;

          return (
            <Card key={proposal.id} className="bg-white/5 border-white/10 overflow-hidden hover:bg-white/10 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-white">{proposal.title}</CardTitle>
                    <CardDescription className="text-gray-400 mt-2 line-clamp-2">
                      {proposal.description}
                    </CardDescription>
                  </div>
                  <div className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    proposal.status === 'Active' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    proposal.status === 'Executed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {proposal.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-300">Requested: {proposal.amount}</span>
                  <span className="text-gray-500">ID: #{proposal.id}</span>
                </div>
                
                {/* Voting Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {proposal.yesVotes}
                    </span>
                    <span className="text-red-400 flex items-center gap-1">
                      {proposal.noVotes} <XCircle className="w-4 h-4" />
                    </span>
                  </div>
                  <Progress value={yesPercentage} className="h-2 bg-red-950 [&>div]:bg-green-500" />
                </div>
              </CardContent>
              <CardFooter className="bg-black/20 border-t border-white/5 p-4 flex gap-3">
                {publicKey ? (
                  <>
                    <Button variant="outline" className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10">Vote Yes</Button>
                    <Button variant="outline" className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10">Vote No</Button>
                  </>
                ) : (
                  <Button variant="secondary" className="w-full" onClick={connect}>
                    Connect to Vote
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
