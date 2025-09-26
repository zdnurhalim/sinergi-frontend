import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface ReusableAlertProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  confirmText2?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onConfirm2?: () => void; // optional tombol kedua
}

export const ReusableAlert: React.FC<ReusableAlertProps> = ({
  title,
  description,
  confirmText = "Yes",
  cancelText = "Cancel",
  confirmText2,
  open,
  onOpenChange,
  onConfirm,
  onConfirm2,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="space-x-2">
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            {cancelText}
          </AlertDialogCancel>
          
          {/* Tombol utama */}
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmText}
          </AlertDialogAction>

          {/* Tombol kedua jika ada */}
          {onConfirm2 && confirmText2 && (
            <AlertDialogAction
              onClick={() => {
                onConfirm2();
                onOpenChange(false);
              }}
            >
              {confirmText2}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
