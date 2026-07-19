package components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsHoveredAsState
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import models.PackageSummary
import theme.ExpressiveMotion
import theme.glassmorphicPanel
import theme.skeuomorphicSurface

@Composable
fun PackageGrid(packages: List<PackageSummary>) {
    LazyVerticalGrid(
        columns = GridCells.Adaptive(minSize = 340.dp),
        contentPadding = PaddingValues(32.dp),
        horizontalArrangement = Arrangement.spacedBy(32.dp),
        verticalArrangement = Arrangement.spacedBy(32.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        items(packages) { pkg ->
            PackageBentoCard(pkg)
        }
    }
}

@Composable
fun PackageBentoCard(pkg: PackageSummary) {
    val interactionSource = remember { MutableInteractionSource() }
    val isHovered by interactionSource.collectIsHoveredAsState()
    val isPressed by interactionSource.collectIsPressedAsState()

    val scale by animateFloatAsState(
        targetValue = if (isPressed) 0.95f else if (isHovered) 1.02f else 1f,
        animationSpec = if (isPressed) ExpressiveMotion.FastEffects else ExpressiveMotion.BouncySpring
    )

    Box(
        modifier = Modifier
            .scale(scale)
            .height(380.dp)
            .fillMaxWidth()
            .clip(RoundedCornerShape(32.dp))
            .glassmorphicPanel(cornerRadius = 32f, intensity = if (isHovered) 1.5f else 1.0f)
            .background(Color(0xFF151520).copy(alpha = 0.6f))
            .clickable(
                interactionSource = interactionSource,
                indication = null,
                onClick = { println("Navigate to ${pkg.id}") }
            )
            .padding(24.dp)
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            // Visual Preview Placeholder for the "bento" feel
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f)
                    .clip(RoundedCornerShape(16.dp))
                    .background(Color.Black.copy(alpha = 0.3f))
                    .skeuomorphicSurface(depth = 2f)
            ) {
                // If we had the actual preview bytes, we'd render an Image here
                // For now, render a stylish placeholder based on kind
                Text(
                    text = pkg.kind.uppercase(),
                    color = Color.White.copy(alpha = 0.2f),
                    fontSize = 32.sp,
                    fontWeight = FontWeight.Black,
                    modifier = Modifier.align(Alignment.Center)
                )
            }

            Spacer(Modifier.height(24.dp))

            Text(
                text = pkg.name,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )

            Spacer(Modifier.height(8.dp))

            Text(
                text = pkg.description ?: "No description available.",
                fontSize = 14.sp,
                color = Color(0xFFA0A0B0),
                maxLines = 2,
                overflow = TextOverflow.Ellipsis,
                lineHeight = 20.sp
            )

            Spacer(Modifier.height(16.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Capabilities badges
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    pkg.capabilities.take(2).forEach { cap ->
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(8.dp))
                                .background(Color(0xFF333344))
                                .padding(horizontal = 8.dp, vertical = 4.dp)
                        ) {
                            Text(
                                cap,
                                color = Color(0xFFD0D0E0),
                                fontSize = 10.sp,
                                fontWeight = FontWeight.SemiBold
                            )
                        }
                    }
                }

                // Price tag
                Text(
                    text = if (pkg.priceStatus == "paid") "$9.99" else "FREE",
                    color = if (pkg.priceStatus == "paid") Color(0xFF6C47FF) else Color(0xFF44C088),
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Black
                )
            }
        }
    }
}
