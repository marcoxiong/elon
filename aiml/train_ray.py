import ray
import torch
import torch.nn as nn
import torch.optim as optim
from ray.train.torch import TorchTrainer
from ray.air.config import ScalingConfig
from torch.utils.data import DataLoader, TensorDataset

# ✅ Explicitly start Ray to avoid connection issues
if not ray.is_initialized():
    ray.init(ignore_reinit_error=True, log_to_driver=True)

# ✅ Define a simple PyTorch model
class SimpleModel(nn.Module):
    def __init__(self):
        super(SimpleModel, self).__init__()
        self.linear = nn.Linear(10, 1)  # Model: 10 input features → 1 output

    def forward(self, x):
        return self.linear(x)

# ✅ Generate dummy training data (simulating real training)
def get_dataloader(batch_size=8):
    x_train = torch.rand(100, 10)  # 100 samples, 10 features
    y_train = torch.rand(100, 1)   # 100 labels
    dataset = TensorDataset(x_train, y_train)
    return DataLoader(dataset, batch_size=batch_size, shuffle=True)

# ✅ Define a proper training function
def train_func():
    model = SimpleModel()
    optimizer = optim.SGD(model.parameters(), lr=0.01)
    loss_fn = nn.MSELoss()  # Mean Squared Error Loss
    dataloader = get_dataloader()

    for epoch in range(5):  # Train for 5 epochs
        total_loss = 0.0
        for x_batch, y_batch in dataloader:
            optimizer.zero_grad()
            output = model(x_batch)
            loss = loss_fn(output, y_batch)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
        
        print(f"[Epoch {epoch+1}] Training on: {ray.get_runtime_context().get_node_id()}, Loss: {total_loss:.4f}")

# ✅ Start Ray distributed training
trainer = TorchTrainer(train_func, scaling_config=ScalingConfig(num_workers=2))
trainer.fit()

# ✅ Shutdown Ray after training to free resources
ray.shutdown()
