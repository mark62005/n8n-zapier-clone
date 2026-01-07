"use client";

import type { INodeDialogProps } from "@/types/app/components/component-props/dashboard/editors/nodes/INodeDialogProps";

import { useParams } from "next/navigation";
import { toast } from "sonner";
import { generateGoogleFormScript } from "@/lib/utils/workflows/triggers";

import { CopyIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function GoogleFormTriggerDialog({ open, onOpenChange }: INodeDialogProps) {
	const params = useParams();
	const workflowId = params.workflowId as string;

	// Construct the webhook URL
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
	const webhookUrl = `${baseUrl}/api/webhooks/google-form?workflowId=${workflowId}`;

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(webhookUrl);

			toast.success("Webhook URL copied to clipboard successfully.");
		} catch (error) {
			toast.error("Failed to copy the webhook URL.");
		}
	}

	async function handleCopyGoogleAppsScript() {
		const script = generateGoogleFormScript(webhookUrl);

		try {
			await navigator.clipboard.writeText(script);

			toast.success("Script copied to clipboard successfully.");
		} catch (error) {
			toast.error("Failed to copy script.");
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Google Form Trigger Configuration</DialogTitle>
					<DialogDescription>
						Use this webhook URL in your Google Form's Apps Script to trigger
						this workflow when a form is submitted.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					{/* WEBHOOK URL */}
					<div className="space-y-2">
						<Label htmlFor="webhook-url">Webhook URL</Label>

						<div className="flex gap-2">
							<Input
								id="webhook-url"
								value={webhookUrl}
								readOnly
								className="font-mono text-sm"
							/>

							<Button
								type="button"
								size="icon"
								variant="outline"
								onClick={copyToClipboard}
							>
								<CopyIcon className="size-4" />
							</Button>
						</div>
					</div>

					<div className="rounded-lg bg-muted p-4 space-y-2">
						<h4 className="font-medium text-sm">Setup Instructions: </h4>

						<ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
							<li>Open your Google Form</li>
							<li>Click the three dots menu → Apps Script</li>
							<li>Copy and paste the script below</li>
							<li>Replace WEBHOOK_URL with your webhook URL above</li>
							<li>Save and click "Triggers" → Add Trigger</li>
							<li>Choose: From form → On form submit → Save</li>
						</ol>
					</div>

					<div className="rounded-lg bg-muted p-4 space-y-3">
						<h4 className="font-medium text-sm">Google Apps Script: </h4>

						<Button
							type="button"
							variant="outline"
							onClick={handleCopyGoogleAppsScript}
						>
							<CopyIcon className="size-4 mr-2" />
							Copy Google Apps Script
						</Button>

						<p className="text-xs text-muted-foreground">
							This script includes your webhook URL and handles form
							submissions.
						</p>
					</div>

					<div className="rounded-lg bg-muted p-4 space-y-3">
						<h4 className="font-medium text-sm">Available Variables</h4>

						<ul className="text-sm text-muted-foreground space-y-1">
							{/* RESPONDENT EMAIL */}
							<li>
								<code className="px-1 py-0.5 bg-background rounded">
									{"{{googleForm.respondentEmail}}"}
								</code>
								- Respondent's email
							</li>

							{/* RESPONSE: QUESTION NAME */}
							<li>
								<code className="px-1 py-0.5 bg-background rounded">
									{"{{googleForm.responses['Question Name']}}"}
								</code>
								- Specific answer
							</li>

							{/* CONVERT ALL RESPONSES AS JSON */}
							<li>
								<code className="px-1 py-0.5 bg-background rounded">
									{"{{json googleForm.responses}}"}
								</code>
								- Convert all responses to JSON
							</li>
						</ul>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
export default GoogleFormTriggerDialog;
